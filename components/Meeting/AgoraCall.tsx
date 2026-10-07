'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AgoraRTC, {
  AgoraRTCProvider,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalVideoTrack,
  LocalVideoTrack,
  useIsConnected,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUserTrack,
  useRemoteUsers,
} from 'agora-rtc-react';
import { createTheToken } from '@service';
import { useUser } from '@selectors';
import { setScreenSharingReducer } from '@slice';

import type { ClientComponentProps } from '@types';
import type { StoreMeetingState, ReduxProps } from '@store-types';
import type { AgoraCallProps } from './types';
import { MAX_MEETING_MINUTES } from './constants';

// agora-rtc-react's <RemoteUser> always plays remote video with the SDK's
// default "cover" fit, which crops a portrait phone stream to fill a
// landscape tile. Playing the track ourselves lets us request "contain" so
// the full frame (whatever its orientation) stays visible, letterboxed
// instead of cropped.
function RemoteVideoTile({ user }: { user: IAgoraRTCRemoteUser }) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const { track } = useRemoteUserTrack(user, 'video');

  useEffect(() => {
    if (!track || !container) return;
    track.play(container, { fit: 'contain' });
    return () => {
      track.stop();
    };
  }, [track, container]);

  return <div ref={setContainer} className="w-full h-full" />;
}

function Call(props: { channelName: string; AppID: string, Client: IAgoraRTCClient, token: string | null; uid: string | number; onStart: () => void }) {
  const { muteCamera, muteMic, screenSharing } = useSelector<ReduxProps, StoreMeetingState>(
    (state) => state.meeting
  );
  const { AppID, channelName, Client, token, uid, onStart } = props;
  const dispatch = useDispatch();

  const [user] = useUser();

  const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const [screenTrack, setScreenTrack] = useState<ILocalVideoTrack | null>(null);
  const isConnected = useIsConnected();
  const remoteUsers = useRemoteUsers();

  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // Debug logs
  useEffect(() => {
    // console.log('🔍 DEBUG INFO:');
    // console.log('Token:', token);
    // console.log('Channel:', channelName);
    // console.log('AppID:', AppID);
    // console.log('Remote Users:', remoteUsers.length);
    // console.log('Audio Tracks:', audioTracks.length);
    // console.log('Local Mic Track:', !!localMicrophoneTrack);
    // console.log('Local Camera Track:', !!localCameraTrack);
    // console.log('Mute Mic:', muteMic);
    // console.log('Mute Camera:', muteCamera);
    // console.log('User ID (uid):', user?.id);
  }, [token, channelName, AppID, remoteUsers, audioTracks, localMicrophoneTrack, localCameraTrack, muteMic, muteCamera, user]);

  // The camera and the screen share one video slot, managed below, so only the
  // mic goes through usePublish.
  usePublish([localMicrophoneTrack]);

  useJoin({
    appid: AppID,
    channel: channelName,
    token: token,
    uid,
  });

  // Closing the tab skips useJoin's unmount cleanup, so leave the channel
  // explicitly to let the other participants see us drop straight away.
  useEffect(() => {
    const handlePageHide = () => {
      Client.leave().catch(() => undefined);
    };
    window.addEventListener('pagehide', handlePageHide);
    return () => window.removeEventListener('pagehide', handlePageHide);
  }, [Client]);

  // The time limit starts once someone else is in the channel, so time spent
  // waiting for the other side to join doesn't count against the call.
  useEffect(() => {
    if (isConnected && remoteUsers.length > 0) onStart();
  }, [isConnected, remoteUsers.length, onStart]);

  // Play remote audio tracks in effect
  useEffect(() => {

    audioTracks.forEach((track, index) => {

      track.play();
    });
  }, [audioTracks]);

  // Switching between camera and screen takes several awaited SDK calls, so
  // run the steps one at a time to stop a quick toggle from interleaving them.
  const videoQueue = useRef<Promise<void>>(Promise.resolve());
  const runVideoStep = useCallback((step: () => Promise<void>) => {
    videoQueue.current = videoQueue.current.then(step).catch(console.error);
  }, []);

  // Capture the screen while sharing is on. Sharing can also end outside our
  // button (the picker is dismissed, or the browser's own "Stop sharing" bar is
  // used), so those paths reset the shared state too.
  useEffect(() => {
    if (!screenSharing) return;

    let active = true;
    let track: ILocalVideoTrack | null = null;

    runVideoStep(async () => {
      if (!active) return;
      let created: ILocalVideoTrack;
      try {
        // 1920×1080 at 30 fps. Screen presets differ from camera presets:
        // "1080p_1" here caps capture at 5 fps, too choppy for switching tabs.
        // "detail" keeps text sharp, dropping frame rate rather than
        // resolution when bandwidth runs short.
        created = await AgoraRTC.createScreenVideoTrack(
          { encoderConfig: '1080p_2', optimizationMode: 'detail' },
          'disable'
        );
      } catch (error) {
        console.warn('Screen share not started:', error);
        if (active) dispatch(setScreenSharingReducer(false));
        return;
      }
      if (!active) {
        created.close();
        return;
      }
      created.on('track-ended', () => dispatch(setScreenSharingReducer(false)));
      track = created;
      setScreenTrack(created);
    });

    return () => {
      active = false;
      setScreenTrack(null);
      runVideoStep(async () => {
        const ended = track;
        if (!ended) return;
        track = null;
        try {
          if (Client.localTracks.includes(ended)) await Client.unpublish(ended);
        } finally {
          ended.close();
        }
      });
    };
  }, [screenSharing, Client, dispatch, runVideoStep]);

  // Agora lets a client publish only one video track, so the camera and the
  // screen take turns: the camera is unpublished and switched off while
  // sharing, then switched back on and republished once sharing stops.
  // Without a camera (none attached, or access denied) the screen goes out alone.
  useEffect(() => {
    runVideoStep(async () => {
      if (screenTrack) {
        if (localCameraTrack) {
          if (Client.localTracks.includes(localCameraTrack)) {
            await Client.unpublish(localCameraTrack);
          }
          await localCameraTrack.setEnabled(false);
        }
        if (isConnected && !Client.localTracks.includes(screenTrack)) {
          await Client.publish(screenTrack);
        }
        return;
      }

      if (!localCameraTrack) return;
      await localCameraTrack.setEnabled(!muteCamera);
      if (isConnected && !muteCamera && !Client.localTracks.includes(localCameraTrack)) {
        await Client.publish(localCameraTrack);
      }
    });
  }, [isConnected, localCameraTrack, screenTrack, muteCamera, Client, runVideoStep]);

  // A share left on when the call unmounts shouldn't restart in the next call
  useEffect(() => () => {
    dispatch(setScreenSharingReducer(false));
  }, [dispatch]);

  useEffect(() => {
    if (!localMicrophoneTrack) return;
    console.log('🎤 Microphone enabled:', !muteMic);
    localMicrophoneTrack.setEnabled(!muteMic);
  }, [muteMic, localMicrophoneTrack]);

  const deviceLoading = isLoadingMic || isLoadingCam;

  if (deviceLoading)
    return (
      <div className="flex h-full w-full items-center justify-center text-gray-300">
        Loading devices...
      </div>
    );

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Main video area: responsive grid for participants */}
      <div className={
        remoteUsers.length > 1
          ? "relative w-full h-full grid grid-cols-2 md:grid-cols-3 gap-4 p-4"
          : "relative w-full h-full flex items-center justify-center"
      }>
        {remoteUsers.length > 0 ? (
          remoteUsers.map((user, idx) => (
            <div
              className="w-full h-full flex items-center justify-center transition-all duration-500 bg-black rounded-2xl shadow-2xl border-2 border-gray-700 overflow-hidden"
              key={String(user.uid ?? idx)}
            >
              <RemoteVideoTile user={user} />
            </div>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-medium bg-black/70 rounded-2xl">
            Waiting for other participants to join...
          </div>
        )}
        {/* Local video as floating tile with glow (only if not in grid mode) */}
        {remoteUsers.length <= 1 && (
          <div className="absolute bottom-8 right-8 w-48 h-32 rounded-xl shadow-xl overflow-hidden border-2 border-white/80 bg-black/80 animate-fade-in ring-4 ring-blue-500/30">
            {screenTrack ? (
              <LocalVideoTrack
                track={screenTrack}
                play={true}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <LocalVideoTrack
                track={localCameraTrack}
                play={true}
                className="w-full h-full object-cover rounded-xl"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}



const AgoraCall: ClientComponentProps<AgoraCallProps> = ({ id, ended, onStart }) => {
  // Created once: a fresh client on every render would swap the provider's
  // client mid-call, leaving the hooks below on a client that never joined.
  const [client] = useState(() =>
    // Prefer H.264 to maximize interoperability with native mobile SDKs.
    AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' })
  );

  const [token, setToken] = useState<string | null>(null);
  const [agoraUid, setAgoraUid] = useState<string | number | null>(null);
  const [user] = useUser();

  useEffect(() => {
    const generateToken = async (resolvedUid: string) => {
      console.log('🔄 Generating token for channel:', id);
      // Implement server-side token generation
      const generatedToken = await fetchAgoraToken(id, resolvedUid);
      console.log('✅ Fetched Agora Token:', generatedToken);
      setToken(generatedToken?.token ?? null);
      setAgoraUid(generatedToken?.uid ?? null);
    };

    if (id && user?.id) {
      generateToken(user.id);
    }
  }, [id, user?.id]);

  console.log('🔑 Current token state:', token);

  async function fetchAgoraToken(channelName: string, uid: string | number) {
    try {
      console.log('📡 Calling createTheToken API with channelName/uid:', channelName, uid);
      const response = await createTheToken({ channelName, uid });

      if (!response.success) {
        console.error('❌ Token generation failed:', response.message);
        throw new Error('Token generation failed');
      }

      console.log('✅ Token generated successfully:', response.token);
      // If backend returns numericUid (common for mobile interoperability), prefer it.
      const preferredUid =
        typeof response.numericUid === 'number' ? response.numericUid : uid;

      return { token: response.token as string, uid: preferredUid };
    } catch (error) {
      console.error('❌ Token generation error:', error);
      return null;
    }
  }


  // Unmounting <Call> ends the Agora session: useJoin's cleanup unpublishes and
  // closes the camera and mic tracks, then leaves the channel.
  if (ended)
    return (
      <div className="flex h-full w-full items-center justify-center px-6 text-center text-xl font-medium text-gray-300">
        This meeting reached its {MAX_MEETING_MINUTES}-minute limit and has ended.
      </div>
    );

  if (!id || !token || agoraUid == null) return <></>;

  return (
    <AgoraRTCProvider client={client}>
      <Call
        Client={client}
        channelName={id}
        AppID={process.env.NEXT_PUBLIC_AGORA_APP_ID || 'b03a1cbf5d3e43ff973a26d84a726f85'}
        token={token}
        uid={agoraUid}
        onStart={onStart}
      />
    </AgoraRTCProvider>
  );
};

export default AgoraCall;








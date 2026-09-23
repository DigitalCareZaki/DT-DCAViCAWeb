'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AgoraRTC, {
  AgoraRTCProvider,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  LocalVideoTrack,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  useLocalScreenTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUserTrack,
  useRemoteUsers,
} from 'agora-rtc-react';
import { createTheToken } from '@service';
import { useUser } from '@selectors';

import type { ClientComponentProps } from '@types';
import type { StoreMeetingState, ReduxProps } from '@store-types';
import type { AgoraCallProps } from './types';

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

function Call(props: { channelName: string; AppID: string, Client: IAgoraRTCClient, token: string | null; uid: string | number }) {
  const { muteCamera, muteMic, screenSharing } = useSelector<ReduxProps, StoreMeetingState>(
    (state) => state.meeting
  );
  const { AppID, channelName, Client, token, uid } = props;

  const [user] = useUser();

  const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();

  // Add screen sharing track
  const {
    isLoading: isLoadingScreen,
    screenTrack: localScreenTrack
  } = useLocalScreenTrack(
    screenSharing,  // ready flag
    {},    // optional config
    "disable", // audio option
  );
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

  // Always publish mic + (camera or screen)
  usePublish([
    localMicrophoneTrack,
    screenSharing ? localScreenTrack : localCameraTrack
  ]);

  useJoin({
    appid: AppID,
    channel: channelName,
    token: token,
    uid,
  });

  // Play remote audio tracks in effect
  useEffect(() => {

    audioTracks.forEach((track, index) => {

      track.play();
    });
  }, [audioTracks]);

  // Only enable/disable tracks, do not publish/unpublish manually
  useEffect(() => {
    if (!localCameraTrack) return;
    console.log('📹 Camera track enabled:', !muteCamera && !screenSharing);
    localCameraTrack.setEnabled(!muteCamera && !screenSharing);
  }, [muteCamera, localCameraTrack, screenSharing]);

  useEffect(() => {
    if (!localMicrophoneTrack) return;
    console.log('🎤 Microphone enabled:', !muteMic);
    localMicrophoneTrack.setEnabled(!muteMic);
  }, [muteMic, localMicrophoneTrack]);

  useEffect(() => {
    if (!localScreenTrack) return;
    console.log('🖥️ Screen track enabled:', screenSharing);
    localScreenTrack.setEnabled(screenSharing);
  }, [screenSharing, localScreenTrack]);

  const deviceLoading = isLoadingMic || isLoadingCam || isLoadingScreen;

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
            {screenSharing && localScreenTrack ? (
              <LocalVideoTrack
                track={localScreenTrack}
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



const AgoraCall: ClientComponentProps<AgoraCallProps> = ({ id }) => {
  const client = useRTCClient(
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


  if (!id || !token || agoraUid == null) return <></>;

  return (
    <AgoraRTCProvider client={client}>
      <Call
        Client={client}
        channelName={id}
        AppID={process.env.NEXT_PUBLIC_AGORA_APP_ID || 'b03a1cbf5d3e43ff973a26d84a726f85'}
        token={token}
        uid={agoraUid}
      />
    </AgoraRTCProvider>
  );
};

export default AgoraCall;








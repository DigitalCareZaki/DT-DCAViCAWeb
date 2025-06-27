'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AgoraRTC, {
  AgoraRTCProvider,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  useLocalScreenTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
} from 'agora-rtc-react';
import { createTheToken } from '@service';
import { useUser } from '@selectors';

import type { ClientComponentProps } from '@types';
import type { StoreMeetingState, ReduxProps } from '@store-types';
import type { AgoraCallProps } from './types';


function Call(props: { channelName: string; AppID: string, Client: IAgoraRTCClient, token: string | null }) {
  const { muteCamera, muteMic, screenSharing } = useSelector<ReduxProps, StoreMeetingState>(
    (state) => state.meeting
  );
  const { AppID, channelName, Client, token } = props;

  const [user] = useUser();

  console.log(' get call funcation user >>>>>>', user);

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
    console.log('🔍 DEBUG INFO:');
    console.log('Token:', token);
    console.log('Channel:', channelName);
    console.log('AppID:', AppID);
    console.log('Remote Users:', remoteUsers.length);
    console.log('Audio Tracks:', audioTracks.length);
    console.log('Local Mic Track:', !!localMicrophoneTrack);
    console.log('Local Camera Track:', !!localCameraTrack);
    console.log('Mute Mic:', muteMic);
    console.log('Mute Camera:', muteCamera);
    console.log('User ID (uid):', user?.id);
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
    uid: user?.id,
  });

  // Play remote audio tracks in effect
  useEffect(() => {
    console.log('🎵 Playing audio tracks:', audioTracks.length);
    audioTracks.forEach((track, index) => {
      console.log(`Playing track ${index}:`, track);
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
      <div className="flex flex-col items-center pt-40">Loading devices...</div>
    );

  return (
    <>
      <div className="relative h-[60%] w-full rounded-lg bg-dark-secondary">
        <div className="h-full w-full rounded-lg">
          {remoteUsers.slice(0, 1).map((user, idx) => (
            <div className="h-full w-full" key={idx}>
              <RemoteUser user={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-[30%] w-full gap-4 rounded-lg">
        <div className="w-64">
          {/* Conditionally render screen share or camera track */}
          {screenSharing && localScreenTrack ? (
            <LocalVideoTrack
              track={localScreenTrack}
              play={true}
              className="h-full w-full rounded-lg"
            />
          ) : (
            <LocalVideoTrack
              track={localCameraTrack}
              play={true}
              className="h-full w-full rounded-lg"
            />
          )}
        </div>
        {remoteUsers.slice(1, remoteUsers.length).map((user, idx) => (
          <div className="w-64" key={idx}>
            <RemoteUser user={user} />
          </div>
        ))}
      </div>
    </>
  );
}



const AgoraCall: ClientComponentProps<AgoraCallProps> = ({ id }) => {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' })
  );

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const generateToken = async () => {
      console.log('🔄 Generating token for channel:', id);
      // Implement server-side token generation
      const generatedToken = await fetchAgoraToken(id);
      console.log('✅ Fetched Agora Token:', generatedToken);
      setToken(generatedToken);
    };

    if (id) {
      generateToken();
    }
  }, [id]);

  console.log('🔑 Current token state:', token);

  async function fetchAgoraToken(channelName: string) {
    try {
      console.log('📡 Calling createTheToken API with channelName:', channelName);
      const response = await createTheToken({ channelName });
      console.log('📡 API Response:', response);

      if (!response.success) {
        console.error('❌ Token generation failed:', response.message);
        throw new Error('Token generation failed');
      }

      console.log('✅ Token generated successfully:', response.token);
      return response.token;
    } catch (error) {
      console.error('❌ Token generation error:', error);
      return null;
    }
  }


  if (!id || !token) return <></>;

  return (
    <AgoraRTCProvider client={client}>
      <Call Client={client} channelName={id} AppID="cfd13282cfcd4a70a542490cb0437c87" token={token} />
    </AgoraRTCProvider>
  );
};

export default AgoraCall;








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
              key={idx}
            >
              <RemoteUser user={user} />
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
      {/* Floating control bar placeholder */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 flex items-center gap-4 bg-black/70 rounded-full px-6 py-3 shadow-lg animate-fade-in">
        {/* TODO: Replace with <Control /> component for actual controls */}
        {/* <span className="text-white text-lg font-semibold opacity-60">Controls go here</span> */}
      </div>
    </div>
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
      <Call Client={client} channelName={id} AppID={process.env.NEXT_PUBLIC_AGORA_APP_ID || 'b03a1cbf5d3e43ff973a26d84a726f85'} token={token} />
    </AgoraRTCProvider>
  );
};

export default AgoraCall;








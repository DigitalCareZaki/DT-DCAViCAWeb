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

import type { ClientComponentProps } from '@types';
import type { StoreMeetingState, ReduxProps } from '@store-types';
import type { AgoraCallProps } from './types';

function Call(props: { channelName: string; AppID: string, Client: IAgoraRTCClient }) {
  const { muteCamera, muteMic, screenSharing } = useSelector<ReduxProps, StoreMeetingState>(
    (state) => state.meeting
  );
  const { AppID, channelName, Client } = props;

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


  useEffect(() => {
    const screenSharingUser = remoteUsers.find((user) => {
      return user.uid.toString().startsWith("screen_"); // Example check
    });
    console.log("screenSharingUser ", screenSharingUser);
  }, [remoteUsers]);


  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // Include localScreenTrack in publish when screen sharing
  usePublish([
    localMicrophoneTrack,
    screenSharing ? localScreenTrack : localCameraTrack
  ],
  );

  useJoin({
    appid: AppID,
    channel: channelName,
    token: null,
  });

  audioTracks.map((track) => track.play());

  useEffect(() => {
    console.log('Screen Sharing:', screenSharing);
    console.log('Screen Track:', localScreenTrack);

  }, [screenSharing, localScreenTrack]);




  const deviceLoading = isLoadingMic || isLoadingCam || isLoadingScreen;

  useEffect(() => {
    console.log("screenSharing ", screenSharing);

    if (!localScreenTrack && !localCameraTrack) return;

    console.log("screen sharing toggled");

    const toggleScreenSharing = async () => {
      if (screenSharing) {
        // Disable camera track before publishing the screen track
        if (localCameraTrack) {
          await Client.unpublish(localCameraTrack);
          console.log("Camera track unpublished");
          localCameraTrack.setEnabled(false); // Disable the camera track
        }

        // Publish the screen track
        if (localScreenTrack) {
          await localScreenTrack.setEnabled(true); // Enable the screen track
          await Client.publish(localScreenTrack);
          console.log("Screen track published");
        }
      } else {
        // If screen sharing is off, switch back to camera
        if (localScreenTrack) {
          await Client.unpublish(localScreenTrack);
          console.log("Screen track unpublished");
          localScreenTrack.stop(); // Stop the screen track
          localScreenTrack.close(); // Close the screen track
          localScreenTrack.setEnabled(false); // Disable screen sharing
        }

        // Publish the camera track if available
        if (localCameraTrack && !muteCamera) {
          console.log("Starting the camera again");
          await localCameraTrack.setEnabled(true); // Ensure the camera track is enabled
          await Client.publish(localCameraTrack); // Now publish the camera track
          console.log("Camera track published");
        }
      }
    };

    toggleScreenSharing();
  }, [screenSharing, localScreenTrack, localCameraTrack, Client]);



  useEffect(() => {
    const toggleCameraTrack = async () => {
      if (!localCameraTrack) return;

      try {
        if (screenSharing) {
          // Disable the camera track when screen sharing is on
          return;
        } else {
          // Enable the camera track based on muteCamera state
          if (!muteCamera) {
            await localCameraTrack.setEnabled(true);  // Enable camera if not muted
            // Publish the camera track if it's enabled
            await Client.publish(localCameraTrack);
            console.log("Camera track published");
          } else {
            await localCameraTrack.setEnabled(false);  // Disable the camera if muted
            // Optionally unpublish if not needed
            await Client.unpublish(localCameraTrack);
            console.log("Camera track unpublished due to mute");
          }
        }
      } catch (error) {
        console.error("Error managing camera track:", error);
      }
    };

    toggleCameraTrack();
  }, [muteCamera, localCameraTrack, screenSharing, Client]);


  useEffect(() => {
    if (!localMicrophoneTrack) return;
    localMicrophoneTrack.setEnabled(!muteMic);
  }, [muteMic, localMicrophoneTrack]);

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
    // const generateToken = async () => {
    //   // Implement server-side token generation
    //   const generatedToken = await fetchAgoraToken(id);
    //   setToken(generatedToken);
    // };

    // if (id) {
    //   generateToken();
    // }
  }, [id]);

  async function fetchAgoraToken(channelName: string) {
    try {
      const response = await fetch('/api/agora/token', {
        method: 'POST',
        body: JSON.stringify({ channelName })
      });

      if (!response.ok) {
        throw new Error('Token generation failed');
      }

      const { token } = await response.json();
      console.log("token ", token);

      return token;
    } catch (error) {
      console.error('Token generation error:', error);
      return null;
    }
  }


  if (!id) return <></>;

  return (
    <AgoraRTCProvider client={client}>
      <Call Client={client} channelName={id} AppID="0f23c5777fa24370bded56a7e133f88f" />
    </AgoraRTCProvider>
  );
};

export default AgoraCall;

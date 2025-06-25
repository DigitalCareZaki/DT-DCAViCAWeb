'use client';

import { useRef, useEffect } from 'react';
import { io, type Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

import {
  handleEventReducer,
  addToParticipantsReducer,
  addToChatsReducer,
  setToRoomChatsReducer,
  showModalReducer,
  setNewNotificationsReducer,
} from '@slice';
import { fetchRoomChats } from '@service';

import type { ClientComponentProps, ChildrenComponentProps } from '@types';
import type {
  StoreChatState,
  ReduxProps,
  StoreSocketState,
} from '@store-types';

const WebSocketProvider: ClientComponentProps<ChildrenComponentProps> = ({
  children,
  user,
}) => {
  const isDynamicMessage = useRef<boolean>(false);
  const { selectedRooms } = useSelector<ReduxProps, StoreChatState>(
    (state) => state.chats
  );

  const { emit: emitters } = useSelector<ReduxProps, StoreSocketState>(
    (state) => state.socket
  );

  const socket = useRef<Socket | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.id) return;

    // Haris
    // wss://mobility-health-backend-production.up.railway.app

    // Softsols
    // wss://avica.up.railway.app

    socket.current = io(
      'wss://avica.up.railway.app',
      {
        transports: ['websocket'],
        autoConnect: false,
        query: { ...user },
      }
    );

    if (!socket.current.connected) {
      socket.current.connect();

      // Log all events received
      socket.current.onAny((event, ...args) => {
        console.log('[WebSocketProvider] Socket event received:', event, ...args);
      });

      // Define the handler separately so it can be removed
      const handler = (payload: any) => {
        console.log('Received notification', payload); // DEBUG LOG
        dispatch(setNewNotificationsReducer({ data: payload }));
        dispatch(
          showModalReducer({
            type: 'SUCCESS',
            message: 'You recieved new notification',
            show: true,
          })
        );
      };

      socket.current.on(`${user.id}:recieve_notification`, handler);

      // CLEANUP: Remove the event listener on unmount or user change
      return () => {
        socket.current?.off(`${user.id}:recieve_notification`, handler);
      };
    }

    // If not connecting, still return a cleanup function
    return () => { };
  }, [user]);

  useEffect(() => {
    if (!socket.current) return;
    if (!emitters?.event?.length) return;

    if (['appointment', 'message'].includes(emitters.event)) {
      console.log('[WebSocketProvider] Emitting event:', emitters.event, emitters.payload); // DEBUG LOG
      socket.current.emit(emitters.event, emitters.payload);
    }

    if (
      ['meeting-controlls', 'meeting-chat'].includes(emitters.event) &&
      emitters.payload
    ) {
      console.log('[WebSocketProvider] Emitting event:', `${emitters.payload.appointment_id}:${emitters.event}`, emitters.payload); // DEBUG LOG
      socket.current.emit(
        `${emitters.payload.appointment_id}:${emitters.event}`,
        emitters.payload
      );
    }

    if (emitters.event === 'room-init') {
      console.log('[WebSocketProvider] Emitting event:', emitters.event, emitters.payload); // DEBUG LOG
      socket.current.emit(emitters.event, emitters.payload);
    }

    if (emitters.event === 'send_notification') {
      console.log('[WebSocketProvider] Emitting event:', emitters.event, emitters.payload); // DEBUG LOG
      socket.current.emit(emitters.event, emitters.payload);
    }

    if (!isDynamicMessage.current) {
      socket.current.on(
        `${emitters.payload?.appointment_id}:totalParticiapnts`,
        (data) => {
          // console.log('totalparticipants');
          dispatch(addToParticipantsReducer({ data }));
        }
      );

      socket.current.on(
        `${emitters.payload?.appointment_id}:meeting-chat-client`,
        (data: any) => {
          // console.log('client-chat: ', data);
          dispatch(addToChatsReducer({ chat: data }));
        }
      );
    }

    dispatch(handleEventReducer({ event: null, payload: null }));
    isDynamicMessage.current = true;

    // return () => {
    //   isDynamicMessage.current = false;
    // };

  }, [emitters]);

  useEffect(() => {
    if (!socket.current) return;
    if (!selectedRooms?.id) return;


    socket.current.on(selectedRooms.id, async (data) => {
      console.log('room-chats: socket data ', data);

      await fetchRoomChats(selectedRooms.id).then((res: any) => {
        const transformedData = {
          [selectedRooms.id]: res?.data?.chats || []
        };

        console.log('room-chats: api ', transformedData);

        dispatch(
          setToRoomChatsReducer({
            key: selectedRooms?.id,
            data: transformedData[selectedRooms.id],
          })
        );
      });
    });
  }, [selectedRooms]);

  return <>{children}</>;
};

export default WebSocketProvider;

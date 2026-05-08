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
  // chat
  applyRoomUpdateReducer,
  setInboxReducer,
} from '@slice';
import { fetchRoomChats, getInbox } from '@service';

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
      process.env.NEXT_PUBLIC_SOCKET_URL || 'wss://api.avica.health',
      // 'ws://localhost:7000',
      {
        transports: ['websocket'],
        autoConnect: false,
        query: { ...user },
      }
    );

    if (!socket.current.connected) {
      socket.current.connect();

      socket.current.on('connect', () => {
        console.log('[WS] Connected. Socket ID:', socket.current?.id);
      });

      socket.current.on('disconnect', (reason) => {
        console.warn('[WS] Disconnected:', reason);
      });

      socket.current.on('connect_error', (err) => {
        console.error('[WS] Connect error:', err?.message || err);
      });

      // Log all events received
      // socket.current.onAny((event, ...args) => {
      //   console.log('[WebSocketProvider] Socket event received:', event, ...args);
      // });

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

      const notificationEvents = [
        `${user.id}:recieve_notification`,
        `${user.id}:receive_notification`,
      ];

      notificationEvents.forEach((event) => {
        console.log('[WS] Listening for:', event);
        socket.current?.on(event, handler);
      });

      // Listen for inbox updates to refresh inbox list
      const inboxHandler = async () => {
        try {
          const inboxRes = await getInbox('inbox');
          console.log('socket real time  >>>', inboxRes);
          if (inboxRes.success) {
            dispatch(setInboxReducer(inboxRes.data));
          }
        } catch (e) {
          // swallow
        }
      };
      const inboxEvent = `${user.id}:inbox_update`;
      console.log('[WS] Listening for:', inboxEvent);
      socket.current.on(inboxEvent, inboxHandler);

      // CLEANUP: Remove the event listener on unmount or user change
      return () => {
        notificationEvents.forEach((event) => {
          socket.current?.off(event, handler);
        });
        socket.current?.off(`${user.id}:inbox_update`, inboxHandler);
      };
    }

    // If not connecting, still return a cleanup function
    return () => { };
  }, [user]);

  useEffect(() => {
    if (!socket.current) return;
    if (!emitters?.event?.length) return;

    if (['appointment', 'leave-appointment', 'message'].includes(emitters.event)) {
      // console.log('[WebSocketProvider] Emitting event:', emitters.event, emitters.payload); // DEBUG LOG
      socket.current.emit(emitters.event, emitters.payload);
    }

    if (emitters.event === 'disconnect-socket') {
      socket.current.disconnect();
      setTimeout(() => {
        socket.current?.connect();
      }, 500);
    }

    if (
      ['meeting-controlls', 'meeting-chat'].includes(emitters.event) &&
      emitters.payload
    ) {
      // console.log('[WebSocketProvider] Emitting event:', `${emitters.payload.appointment_id}:${emitters.event}`, emitters.payload); // DEBUG LOG
      socket.current.emit(
        `${emitters.payload.appointment_id}:${emitters.event}`,
        emitters.payload
      );
    }

    if (emitters.event === 'room-init') {
      // console.log('[WebSocketProvider] Emitting event:', emitters.event, emitters.payload); // DEBUG LOG
      socket.current.emit(emitters.event, emitters.payload);
    }

    if (emitters.event === 'send_notification') {
      // console.log('[WebSocketProvider] Emitting event:', emitters.event, emitters.payload); // DEBUG LOG
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
          console.log('client-chat: format check kia a raha', data);
          dispatch(addToChatsReducer({ chat: data }));
        }
      );
    }

    dispatch(handleEventReducer({ event: null, payload: null }));
    isDynamicMessage.current = true;

    // return () => {
    //   isDynamicMessage.current = false; // output reason:  why 
    // };

  }, [emitters]);

  useEffect(() => {
    if (!socket.current) return;
    if (!selectedRooms?.id) return;


    socket.current.on(selectedRooms.id, async (data) => {
      // console.log('room-chats: socket data ', data);

      await fetchRoomChats(selectedRooms.id).then((res: any) => {
        const transformedData = {
          [selectedRooms.id]: res?.data?.chats || []
        };

        // console.log('room-chats: api ', transformedData);

        dispatch(
          setToRoomChatsReducer({
            key: selectedRooms?.id,
            data: transformedData[selectedRooms.id],
          })
        );
      });
    });
  }, [selectedRooms]);

  // Listen for room list update events to reorder rooms and bump unread counts
  useEffect(() => {
    if (!socket.current) return;
    if (!user?.id) return;

    const event = `${user.id}:room_update`;
    const handler = (payload: { room_id: string; last_message_at?: number; unread_increment?: number }) => {
      dispatch(
        applyRoomUpdateReducer({
          room_id: payload.room_id,
          last_message_at: payload.last_message_at,
          unread_increment: payload.unread_increment ?? 1,
        })
      );
    };

    socket.current.on(event, handler);
    return () => {
      socket.current?.off(event, handler);
    };
  }, [user]);


  return <>{children}</>;
};

export default WebSocketProvider;

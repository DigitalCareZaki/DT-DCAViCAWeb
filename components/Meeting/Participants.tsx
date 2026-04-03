'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ClientGenerator, InputBasic } from '@common';
import { useUser } from '@selectors';
import { handleEventReducer } from '@slice';
import Participant from './Participant';

import type { ClientComponentProps } from '@types';
import type { ParticipantsProps } from './types';
import type { StoreSocketState, ReduxProps } from '@store-types';

const Discussion: ClientComponentProps<ParticipantsProps> = ({ id }) => {
  const { participants: data } = useSelector<ReduxProps, StoreSocketState>(
    (state) => state.socket
  );
  const dispatch = useDispatch();
  const [user] = useUser();

  useEffect(() => {
    if (!user.id) return;
    dispatch(
      handleEventReducer({
        payload: {
          appointment_id: id,
          user_id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          middle_name: user.middle_name,
          role: user.role,
          uri: user.uri,
        },
        event: 'appointment',
      })
    );
    return () => {
      dispatch(
        handleEventReducer({
          payload: {
            appointment_id: id,
            user_id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            middle_name: user.middle_name,
            role: user.role,
            uri: user.uri,
          },
          event: 'leave-appointment',
        })
      );
      dispatch(
        handleEventReducer({
          payload: null,
          event: 'disconnect-socket',
        })
      );
    };
  }, [user]);

  return (
    <div className="flex h-[50%] w-full flex-col gap-4 rounded-xl bg-dark-secondary p-5">
      <div className="flex w-full items-center gap-2">
        <span className=" font-semibold text-white">Participants</span>
        <div className="theme-bg-color flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold text-white">
          <span>{data?.length}</span>
        </div>
      </div>

      <div className="flex w-full flex-col h-[10rem] overflow-scroll-y">
        <ClientGenerator data={data}>
          <Participant />
        </ClientGenerator>
      </div>
    </div>
  );
};

export default Discussion;

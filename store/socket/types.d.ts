import type { PayloadAction } from '@reduxjs/toolkit';
import type { MeetingParticipantsPropsSocket } from '@types';

export interface StoreSocketProps {
  emit: EmitProps;
  participants: MeetingParticipantsPropsSocket[];
}

interface EmitProps {
  event:
    | 'appointment'
    | 'message'
    | 'meeting-controlls'
    | 'meeting-chat'
    | 'room-init'
    | 'send_notification'
    | 'leave-appointment'
    | 'disconnect-socket'
    | null;
  payload: { [key: string]: any } | null;
}

export type HandleEventProps = (
  state: StoreSocketProps,
  payload: PayloadAction<EmitProps>
) => void;

export type AddToParticipantsProps = (
  state: StoreSocketProps,
  payload: PayloadAction<{ data: MeetingParticipantsPropsSocket[] }>
) => void;

'use server';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import MeetingClient from './MeetingClient';
import { validateAppointment, joinMeeting } from '@service';
import Error from './Error';
import type { MeetingProps } from './types';
import type { ServerComponentProps } from '@types';

const AgoraCall = dynamic(() => import('./AgoraCall'), {
  ssr: false,
});

import Participants from './Participants';
import Discussion from './Discussion';
import Topbar from './Topbar';
import Control, { Modal, ControlPropsWithModal } from './Control';
import Counter from './Counter';
import VitalsServerWrapper from './Vitals/ServerWrapper';

const Meeting: ServerComponentProps<MeetingProps> = async ({ id }) => {
  const res = await validateAppointment(id);
  if (!res.success) return <Error />;
  await joinMeeting(id);
  return <MeetingClient id={id} />;
};

export default Meeting;

'use server';

import { TelemedMeetings } from '@common';

import type { ServerComponent } from '@types';

const Meetings: ServerComponent = async () => {
  return <TelemedMeetings />;
};

export default Meetings;

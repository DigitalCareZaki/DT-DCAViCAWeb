'use server';

import { TelemedAddMeeting } from '@common';

import type { ServerComponent } from '@types';

const AddMeeting: ServerComponent = async () => {
  return <TelemedAddMeeting />;
};

export default AddMeeting;

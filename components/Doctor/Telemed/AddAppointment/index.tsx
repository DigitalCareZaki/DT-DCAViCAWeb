'use server';

import { TelemedAddAppointment } from '@common';

import type { ServerComponent } from '@types';

const AddAppointment: ServerComponent = async () => {
  return <TelemedAddAppointment />;
};

export default AddAppointment;

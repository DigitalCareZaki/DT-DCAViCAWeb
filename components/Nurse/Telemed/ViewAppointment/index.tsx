'use server';

import { TelemedViewAppointment } from '@common';

import type { ServerComponent } from '@types';

const ViewApointment: ServerComponent = async () => {
  return <TelemedViewAppointment />;
};

export default ViewApointment;

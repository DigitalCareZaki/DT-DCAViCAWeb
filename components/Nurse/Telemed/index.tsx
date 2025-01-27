'use server';

import { TelemedListAppointments } from '@common';

import type { ServerComponent } from '@types';

const Telemed: ServerComponent = async () => {
  return <TelemedListAppointments />;
};

export default Telemed;

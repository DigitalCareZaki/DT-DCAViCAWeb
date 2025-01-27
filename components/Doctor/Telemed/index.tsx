'use server';

import { TelemedDashboard } from '@common';

import type { ServerComponent } from '@types';

const Telemed: ServerComponent = async () => {
  return <TelemedDashboard />;
};

export default Telemed;

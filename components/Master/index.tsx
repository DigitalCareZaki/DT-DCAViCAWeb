'use server';

import { PageInfo } from '@common';

import Statistics from './Statistics';

import type { ServerComponent } from '@types';

const Master: ServerComponent = async () => {
  return (
    <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      <Statistics />
    </div>
  );
};

export default Master;

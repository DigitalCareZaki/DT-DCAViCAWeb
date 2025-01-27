'use server';

import { ServerGenerator } from '@common';

import type { ServerComponent } from '@types';

const Skeleton: ServerComponent = async () => (
  <div className="relative flex w-full flex-col gap-4 rounded-lg bg-white px-4 py-10">
    <div className="h-4 w-32 animate-pulse rounded-full bg-gray-400" />
    <div className="grid w-full grid-cols-4 flex-wrap gap-4">
      <ServerGenerator data={new Array(20).fill(null)}>
        <div className="h-80 w-full animate-pulse rounded-xl bg-gray-400" />
      </ServerGenerator>
    </div>
  </div>
);

export default Skeleton;

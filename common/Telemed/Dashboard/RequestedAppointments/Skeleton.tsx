'use server';

import { ServerGenerator } from '@common';

import type { ServerComponent } from '@types';

const Skeleton: ServerComponent = async () => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-white px-4 py-10">
      <div className="h-4 w-40 animate-pulse rounded-full bg-gray-400" />

      <div className="hidescrollbar flex w-full items-center gap-4 overflow-x-scroll">
        <ServerGenerator data={new Array(10).fill(null)}>
          <div className="h-96 w-80 shrink-0 animate-pulse rounded-xl bg-gray-400" />
        </ServerGenerator>
      </div>
    </div>
  );
};

export default Skeleton;

'use server';

import type { ServerComponent } from '@types';

const Skeleton: ServerComponent = async () => {
  return (
    <div className="flex h-full w-[20%] flex-col gap-4">
      <div className="flex h-full w-full flex-col gap-4 rounded-lg bg-white p-4 font-poppins">
        <div className="flex w-full items-center justify-between">
          <div className="h-2 w-10 animate-pulse rounded-full bg-gray-400" />
          <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
        </div>
        <div className="hidescrollbar flex h-full w-full flex-col gap-4 overflow-y-scroll">
          <div className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-background-secondary px-1 py-2">
            <div className="h-16 w-16 animate-pulse rounded-lg bg-gray-400" />
          </div>
          <div className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-background-secondary px-1 py-2">
            <div className="h-16 w-16 animate-pulse rounded-lg bg-gray-400" />
          </div>
          <div className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-background-secondary px-1 py-2">
            <div className="h-16 w-16 animate-pulse rounded-lg bg-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;

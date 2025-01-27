'use server';

import type { ServerComponent } from '@types';

const Skeleton: ServerComponent = async () => {
  return (
    <div className="flex h-full w-[20%] flex-col gap-4 font-poppins">
      <div className="education-search-field flex h-14 w-full animate-pulse items-center justify-center rounded-lg border border-gray-100 bg-gray-400 p-2" />
      <div className="hidescrollbar flex h-96 w-full flex-col gap-4 overflow-y-scroll rounded-lg border border-gray-100 bg-white p-4">
        <div className="flex w-full items-center justify-between">
          <div className="h-2 w-10 animate-pulse rounded-full bg-gray-400" />
          <div className="h-4 w-4 animate-pulse rounded-full bg-gray-400" />
        </div>
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
      <div className="flex h-72 w-full flex-col gap-4 rounded-lg border-gray-100 bg-white p-4">
        <div className="flex w-full items-center justify-between">
          <div className="h-2 w-10 animate-pulse rounded-full bg-gray-400" />
          <div className="h-4 w-4 animate-pulse rounded-full bg-gray-400" />
        </div>
        <div className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg bg-background-secondary px-1 py-2 pr-4">
          <div className="flex items-center gap-2">
            <div className="h-16 w-16 shrink-0 animate-pulse rounded-full bg-gray-400" />
            <div className="flex h-full flex-col py-2 text-ssx font-medium">
              <div className="h-2 w-10 animate-pulse rounded-full bg-gray-400" />
              <div className="mt-2 h-2 w-6 animate-pulse rounded-full bg-gray-400" />
            </div>
          </div>
          <div className="h-6 w-14 animate-pulse rounded-full bg-gray-400" />
        </div>
        <div className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg bg-background-secondary px-1 py-2 pr-4">
          <div className="flex items-center gap-2">
            <div className="h-16 w-16 shrink-0 animate-pulse rounded-full bg-gray-400" />
            <div className="flex h-full flex-col py-2 text-ssx font-medium">
              <div className="h-2 w-10 animate-pulse rounded-full bg-gray-400" />
              <div className="mt-2 h-2 w-6 animate-pulse rounded-full bg-gray-400" />
            </div>
          </div>
          <div className="h-6 w-14 animate-pulse rounded-full bg-gray-400" />
        </div>
        <div className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg bg-background-secondary px-1 py-2 pr-4">
          <div className="flex items-center gap-2">
            <div className="h-16 w-16 shrink-0 animate-pulse rounded-full bg-gray-400" />
            <div className="flex h-full flex-col py-2 text-ssx font-medium">
              <div className="h-2 w-10 animate-pulse rounded-full bg-gray-400" />
              <div className="mt-2 h-2 w-6 animate-pulse rounded-full bg-gray-400" />
            </div>
          </div>
          <div className="h-6 w-14 animate-pulse rounded-full bg-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;

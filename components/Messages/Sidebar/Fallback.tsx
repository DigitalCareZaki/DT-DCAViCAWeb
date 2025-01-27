'use server';

import { ServerGenerator } from '@common';

import type { ServerComponent } from '@types';

const SidebarFallback: ServerComponent = async () => {
  return (
    <div className="flex h-[95%] w-[20%] flex-col items-center justify-between gap-10 border-r bg-white p-11 px-4">
      <div className="flex w-full flex-col gap-4 border-b pb-8">
        <div className="flex w-full items-end justify-between">
          <div className="h-4 w-[40%] animate-pulse rounded-full bg-gray-400" />
          <div className="flex cursor-pointer items-center gap-1 rounded-lg p-1 px-2 text-gray-500 transition duration-300 hover:bg-gray-100">
            <div className="h-2 w-6 animate-pulse rounded-full bg-gray-400" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
          </div>
        </div>
        <div className="h-12 w-full animate-pulse rounded-lg bg-gray-400" />
      </div>
      <div className="hidescrollbar flex h-full w-full flex-col overflow-y-scroll ">
        <ServerGenerator
          data={new Array(10).fill(null).map((_, index) => ({ index }))}
        >
          <Preview />
        </ServerGenerator>
      </div>
    </div>
  );
};

const Preview = () => {
  return (
    <div className="flex w-full flex-col border-b pb-6">
      <div className="flex w-full cursor-pointer gap-2 rounded-lg p-2 transition duration-300 patient:hover:bg-rose-50">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-400" />
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full items-center justify-between">
            <div className="h-2 w-10 animate-pulse rounded-full bg-gray-400" />
            <div className="h-2 w-6 animate-pulse rounded-full bg-gray-400" />
          </div>
          <div className="flex w-full">
            <div className="h-4 w-[80%] animate-pulse rounded-full bg-gray-400" />
          </div>
          <div className="flex w-full flex-col gap-1">
            <div className="h-2 w-1/2 animate-pulse rounded-full bg-gray-400" />
            <div className="h-2 w-[60%] animate-pulse rounded-full bg-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFallback;

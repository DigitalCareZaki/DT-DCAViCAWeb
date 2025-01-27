'use client';

import type { ClientComponent } from '@types';

const Loading: ClientComponent = () => {
  return (
    <div className="flex h-fit w-full flex-col gap-2 rounded-xl border border-gray-100 bg-white p-6 font-poppins">
      <div className="flex w-full items-center gap-5">
        <div className="relative h-14 w-14 animate-pulse rounded-full bg-gray-400" />
        <div className="flex flex-col font-semibold gap-2">
          <div className="h-2 w-20 animate-pulse rounded-full bg-gray-200" />
          <div className="h-2 w-10 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default Loading;

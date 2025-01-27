'use server';

import type { ServerComponent } from '@types';

const Fallback: ServerComponent = async () => {
  return (
    <div className="flex h-[95%] w-[5%] flex-col items-center gap-4 rounded-l-lg border-r bg-white p-10">
      <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-400" />
      <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-400" />
      <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-400" />
      <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-400" />
      <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-400" />
    </div>
  );
};

export default Fallback;

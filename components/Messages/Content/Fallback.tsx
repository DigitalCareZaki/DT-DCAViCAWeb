'use server';

import type { ServerComponent } from '@types';

const Fallback: ServerComponent = async () => {
  return (
    <div className="flex h-[95%] w-[75%] flex-col justify-between gap-10 rounded-l-lg bg-white px-4 py-14 pb-2"></div>
  );
};

export default Fallback;

'use server';

import type { ServerComponent } from '@types';

const Discussion: ServerComponent = async () => {
  return (
    <div className="hidescrollbar flex h-[30rem] w-[70%] flex-col justify-between overflow-y-scroll rounded-lg bg-white p-6">
      <span className="screen-title normal-case">Dicussion</span>
      <div className="flex h-[90%] w-full flex-col gap-4 rounded-lg bg-background p-4">
        <div className="flex flex-col gap-1 text-ssx">
          <span className="text-ssx font-semibold text-gray-500">
            Syed Azeem Javed
          </span>
          <div className="w-fit rounded-r-full bg-gray-600 p-2 font-bold text-white">
            <span>Im having immense pain in my chest.</span>
          </div>
          <span className="text-ssx font-semibold text-gray-500">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
        <div className="flex flex-col gap-1 text-ssx">
          <span className="text-ssx font-semibold text-gray-500">
            Syed Azeem Javed
          </span>
          <div className="w-fit rounded-r-full bg-gray-600 p-2 font-bold text-white">
            <span>I feel like my heart has stopped working.</span>
          </div>
          <span className="text-ssx font-semibold text-gray-500">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
        <div className="flex flex-col gap-1 text-ssx">
          <span className="text-ssx font-semibold text-gray-500">Nurse</span>
          <div className="w-fit rounded-r-full bg-gray-600 p-2 font-bold text-white">
            <span>We should admit him, right doctor?</span>
          </div>
          <span className="text-ssx font-semibold text-gray-500">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
        <div className="flex w-full justify-end">
          <div className="flex flex-col gap-1 text-ssx">
            <span className="text-ssx font-semibold text-gray-500">
              Dr. Hooria
            </span>
            <div className="w-fit rounded-l-full theme-bg-color p-2 font-bold text-white">
              <span>
                Give him some Ibuprofen and see if that fixes the issue.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussion;

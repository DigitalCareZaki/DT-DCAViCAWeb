'use client';

import { IoBandageOutline } from '@react-icons/all-files/io5/IoBandageOutline';

import type { ClientComponent } from '@types';

const NoSelectedContent: ClientComponent = () => {
  return (
    <div className="flex h-[85%] w-full flex-col items-center justify-center gap-4">
      <IoBandageOutline size={120} className="text-gray-600" />
      <span className="font-semibold text-gray-400">
        Please select a message
      </span>
    </div>
  );
};

export default NoSelectedContent;

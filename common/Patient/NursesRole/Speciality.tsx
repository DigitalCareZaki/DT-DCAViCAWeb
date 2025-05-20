'use client';

import type { ClientComponentProps } from '@types';

const Speciality: ClientComponentProps<any> = ({ name, value, handleSelect }) => {
  return (
    <div
      onClick={() => handleSelect(name, value)}
      className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
    >
      <span className="font-medium">{name}</span>
    </div>
  );
};

export default Speciality;

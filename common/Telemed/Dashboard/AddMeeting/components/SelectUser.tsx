'use client';

import { getName } from '@init-globals';

import type { ClientComponentProps, SearchTelemedResProps } from '@types';

const SelectUser: ClientComponentProps<SearchTelemedResProps | any> = ({
  id,
  first_name,
  last_name,
  email,
  middle_name,
  handleSelectUser,
}) => {
  return (
    <div
      onClick={() =>
        handleSelectUser({ id, first_name, middle_name, last_name, email })
      }
      className="flex h-12 w-full shrink-0 cursor-pointer flex-col justify-center rounded-lg bg-fuchsia-500 px-4 text-xs text-white transition duration-200 hover:bg-fuchsia-600
    "
    >
      <span className="font-semibold">
        {getName({
          first_name,
          last_name,
          middle_name,
        })}
      </span>
      <span className=" text-[10px] text-fuchsia-200">{email}</span>
    </div>
  );
};

export default SelectUser;

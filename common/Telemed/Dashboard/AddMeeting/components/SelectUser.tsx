'use client';

import { twMerge } from 'tailwind-merge';
import { IoCheckmark } from '@react-icons/all-files/io5/IoCheckmark';

import { getName } from '@init-globals';

import type { ClientComponentProps, SearchTelemedResProps } from '@types';

export const UserAvatar: ClientComponentProps<AvatarProps> = ({
  first_name,
  last_name,
  className,
}) => {
  return (
    <span
      className={twMerge(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold uppercase text-teal-700',
        className
      )}
    >
      {`${first_name?.[0] ?? ''}${last_name?.[0] ?? ''}`}
    </span>
  );
};

const SelectUser: ClientComponentProps<SearchTelemedResProps | any> = ({
  id,
  first_name,
  last_name,
  email,
  middle_name,
  selectedId,
  handleSelectUser,
}) => {
  const isSelected = id === selectedId;

  return (
    <button
      type="button"
      onClick={() =>
        handleSelectUser({ id, first_name, middle_name, last_name, email })
      }
      className={twMerge(
        'flex w-full shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left transition duration-150 hover:bg-teal-50 focus-visible:bg-teal-50 focus-visible:outline-none',
        isSelected && 'bg-teal-50'
      )}
    >
      <UserAvatar first_name={first_name} last_name={last_name} />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-base font-medium text-teal-900">
          {getName({
            first_name,
            last_name,
            middle_name,
          })}
        </span>
        <span className="truncate text-sm text-teal-700/70">{email}</span>
      </span>
      {isSelected && (
        <IoCheckmark size={18} className="shrink-0 text-teal-600" />
      )}
    </button>
  );
};

interface AvatarProps {
  first_name?: string;
  last_name?: string;
  className?: string;
}

export default SelectUser;

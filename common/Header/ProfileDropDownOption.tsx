'use client';

import { ProfileDropdownOption as ProfileDropdownOptionType } from './types';
import { ClientComponentProps } from '@types';

const ProfileDropDownOption: ClientComponentProps<
  ProfileDropdownOptionType
> = ({ title, onClick, classes }) => {
  return (
    <div
      className="h-full w-full cursor-pointer rounded-lg p-2 hover:bg-gray-100"
      onClick={onClick}
    >
      <span>{title}</span>
    </div>
  );
};

export default ProfileDropDownOption;

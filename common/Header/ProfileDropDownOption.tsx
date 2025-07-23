'use client';

import { ProfileDropdownOption as ProfileDropdownOptionType } from './types';
import { ClientComponentProps } from '@types';

const ProfileDropDownOption: ClientComponentProps<
  ProfileDropdownOptionType
> = ({ title, onClick, classes, style }) => {
  return (
    <div
      className={`h-full w-full cursor-pointer rounded-lg p-2 hover:bg-gray-100 ${classes || ''}`}
      onClick={onClick}
      style={style}
    >
      <span>{title}</span>
    </div>
  );
};

export default ProfileDropDownOption;

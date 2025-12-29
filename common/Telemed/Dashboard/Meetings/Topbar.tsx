'use client';

import Link from 'next/link';
import { InputBasic, ButtonPrimary } from '@common';

import type { ClientComponentProps } from '@types';
import type { TopbarProps } from './types';

const Topbar: ClientComponentProps<TopbarProps> = ({ userType, onSearch, loading }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <span className="text-md font-semibold text-gray-600">Appointments</span>
      <div className="flex items-center gap-4">
        <div className="w-60">
          <InputBasic
            borderTheme
            icon="IoSearch"
            placeholder="Search appointments"
            name="search"
            onChange={onSearch}
            loading={loading}
          />
        </div>
        {userType?.toLowerCase() === 'patient' && (
          <div className="w-12">
            <Link
              passHref
              href={`/${userType?.toLowerCase()}/telemed/meetings/add`}
            >
              <ButtonPrimary
                name="haris"
                icon="IoMdAdd"
                variant="icon-only"
                className="doctor:bg-fuchsia-600 patient:bg-fuchsia-600 nurse:bg-fuchsia-600"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;

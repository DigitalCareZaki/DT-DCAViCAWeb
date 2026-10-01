'use client';

import Link from 'next/link';
import { InputBasic, ButtonPrimary, InputDateFilter } from '@common';

import type { ClientComponentProps } from '@types';
import type { TopbarProps } from './types';

const Topbar: ClientComponentProps<TopbarProps> = ({
  userType,
  search,
  onSearch,
  onClearSearch,
  loading,
  date,
  onDateChange,
  onClearDate,
}) => {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4">
      <span className="text-md font-semibold text-gray-600">Appointments</span>
      <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
        {onDateChange && (
          <InputDateFilter value={date} onChange={onDateChange} onClear={onClearDate} />
        )}
        <div className="w-full sm:w-64">
          <InputBasic
            borderTheme
            icon="IoSearch"
            placeholder="Search appointments"
            name="search"
            value={search}
            onChange={onSearch}
            loading={loading}
            secondaryIcon={search && onClearSearch ? 'IoClose' : undefined}
            secondaryOnClick={onClearSearch}
            secondaryIconClassName="shrink-0 cursor-pointer hover:text-gray-700"
            inputWrapperClassName="border-gray-200 shadow-sm"
            inputClassName="text-sm md:text-sm"
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

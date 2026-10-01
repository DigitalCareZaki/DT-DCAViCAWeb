'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { InputBasic, ButtonPrimary, Icon } from '@common';

import type { ClientComponentProps } from '@types';
import type { DateFieldProps, TopbarProps } from './types';

// Inputs hold YYYY-MM-DD; build a local date so the label doesn't shift a day across timezones
const formatDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Shows a formatted date while a transparent native date input on top handles picking
const DateField = ({ placeholder, value, onChange }: DateFieldProps) => (
  <div className="relative flex h-9 flex-1 items-center rounded-md px-2 text-sm transition duration-150 hover:bg-gray-50 focus-within:bg-gray-100 sm:w-[7.5rem] sm:flex-none">
    <span className={twMerge('truncate', value ? 'font-semibold text-gray-700' : 'text-gray-400')}>
      {value ? formatDate(value) : placeholder}
    </span>
    <input
      type="date"
      aria-label={placeholder}
      value={value ?? ''}
      onChange={onChange}
      onClick={(e) => {
        try {
          e.currentTarget.showPicker?.();
        } catch {
          // Browser refused to open the picker programmatically; native behaviour still applies
        }
      }}
      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
    />
  </div>
);

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
          <div className="flex h-12 w-full items-center gap-1 rounded-lg border border-gray-200 bg-white pl-4 pr-2 shadow-sm transition duration-150 superadmin:focus-within:border-theme-superadmin-primary doctor:focus-within:border-theme-doctor-primary patient:focus-within:border-theme-patient-primary nurse:focus-within:border-theme-nurse-primary sm:w-auto">
            <Icon
              name="FaCalendarAlt"
              size={15}
              className={twMerge('mr-1 shrink-0', date ? 'theme-text-color' : 'text-gray-400')}
            />
            <DateField
              placeholder="Select date"
              value={date}
              onChange={onDateChange}
            />
            <button
              type="button"
              aria-label="Clear date"
              onClick={onClearDate}
              className={twMerge(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition duration-150 hover:bg-gray-100',
                !date && 'invisible'
              )}
            >
              <Icon name="IoClose" size={16} />
            </button>
          </div>
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

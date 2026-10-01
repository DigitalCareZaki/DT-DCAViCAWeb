'use client';

import { twMerge } from 'tailwind-merge';
import { Icon } from '../Icon';

import type { ClientComponentProps } from '@types';
import type { DateFieldProps, DateFilterProps } from './types';

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

const DateFilter: ClientComponentProps<DateFilterProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Select date',
}) => (
  <div className="flex h-12 w-full items-center gap-1 rounded-lg border border-gray-200 bg-white pl-4 pr-2 shadow-sm transition duration-150 superadmin:focus-within:border-theme-superadmin-primary doctor:focus-within:border-theme-doctor-primary patient:focus-within:border-theme-patient-primary nurse:focus-within:border-theme-nurse-primary sm:w-auto">
    <Icon
      name="FaCalendarAlt"
      size={15}
      className={twMerge('mr-1 shrink-0', value ? 'theme-text-color' : 'text-gray-400')}
    />
    <DateField placeholder={placeholder} value={value} onChange={onChange} />
    <button
      type="button"
      aria-label="Clear date"
      onClick={onClear}
      className={twMerge(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition duration-150 hover:bg-gray-100',
        !value && 'invisible'
      )}
    >
      <Icon name="IoClose" size={16} />
    </button>
  </div>
);

export default DateFilter;

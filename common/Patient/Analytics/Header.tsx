'use client';

import { InputBasic, InputDateFilter } from '@common';

import type { ClientComponentProps } from '@types';
import type { HeaderProps } from './types';

const AnalyticsHeader: ClientComponentProps<HeaderProps> = ({
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
      <span className="screen-title">Analytics</span>
      <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
        <InputDateFilter value={date} onChange={onDateChange} onClear={onClearDate} />
        <div className="w-full sm:w-64">
          <InputBasic
            borderTheme
            icon="IoSearch"
            placeholder="Search appointments"
            name="search"
            value={search}
            onChange={onSearch}
            loading={loading}
            secondaryIcon={search ? 'IoClose' : undefined}
            secondaryOnClick={onClearSearch}
            secondaryIconClassName="shrink-0 cursor-pointer hover:text-gray-700"
            inputWrapperClassName="border-gray-200 shadow-sm"
            inputClassName="text-sm md:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;

'use client';

import type { TimeSectionProps } from '../types';
import type { ClientComponentProps } from '@types';

const TimeSection: ClientComponentProps<TimeSectionProps> = ({
  Icon,
  title,
  description,
  children,
  showIcon,
}) => {
  return (
    <div className="flex h-full w-full flex-col justify-start gap-4 col-span-1">
      <div className="mb-6 flex w-full items-center gap-2">
        {showIcon && <Icon className="text-fuchsia-500" />}
        {!showIcon && <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-fuchsia-500 focus:ring-fuchsia-400"
          checked></input>}
        <div className="flex flex-col">
          <span className="font-semibold">{title}</span>
          <span className="text-xs font-medium text-gray-400">
            {description}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default TimeSection;

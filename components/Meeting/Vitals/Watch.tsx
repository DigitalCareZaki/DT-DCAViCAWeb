'use client';

import { TooltipBasic } from '@common';

import type { ClientComponentProps, MeasurementValuesProps } from '@types';

const Watch: ClientComponentProps<any> = ({
  mode,
  reading_source,
  status,
  type,
  unit,
  values,
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-dark-main">
        <div className="flex items-center">
          <TooltipBasic title={unit}>
            <span className="text-md font-bold text-t-color-secondary">
              {values.join('/')}
            </span>
          </TooltipBasic>
        </div>
        <div className="flex items-center text-ssx text-gray-400">
          <span>{unit === 'PERCENTAGE' ? '%' : unit}</span>
        </div>
      </div>
      <span className="text-ssx text-gray-400">{type}</span>
    </div>
  );
};

export default Watch;

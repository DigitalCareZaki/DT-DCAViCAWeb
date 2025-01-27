'use server';

import { ButtonPrimary } from '../../Button';
import { TooltipBasic } from '../../Tooltip';

import type { ServerComponent } from '@types';

const Header: ServerComponent = async () => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col">
        <div className="mb-2 flex items-center gap-2">
          <TooltipBasic
            title="Meeting date"
            className="tooltip-theme-background left-[70px] flex h-[26px] w-32 items-center justify-center py-0"
          >
            <span className="text-ssx font-bold text-gray-600">
              Tue Mar 05 2024
            </span>
          </TooltipBasic>
          <TooltipBasic
            title="Meeting duration"
            className="tooltip-theme-background left-[70px] flex h-[26px] w-32 items-center justify-center py-0"
          >
            <div className="theme-div flex h-6 items-center justify-center rounded-lg px-2 doctor:text-white nurse:text-white">
              <span className="cursor-default text-ssx font-bold">
                02:20:20
              </span>
            </div>
          </TooltipBasic>
        </div>

        <span title="Patient name" className="screen-title">
          Azeem Weekly Checkup
        </span>
      </div>
      <div className="w-fit">
        <ButtonPrimary
          name="View Profile"
          className="h-10 rounded-lg px-4"
          icon="FaEye"
          variant="icon"
        />
      </div>
    </div>
  );
};

export default Header;

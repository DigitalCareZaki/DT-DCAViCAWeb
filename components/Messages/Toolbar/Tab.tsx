'use client';

import { TooltipBasic } from '@common';

import type { TabProps } from './types';
import type { ClientComponentProps } from '@types';

const Tab: ClientComponentProps<TabProps> = ({ children, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[20px] text-gray-600 transition duration-300 hover:text-gray-600 doctor:hover:bg-blue-100 patient:hover:bg-rose-100 "
    >
      <TooltipBasic
        title={title}
        className="tooltip-theme-background -mt-[6px] flex h-8 items-center justify-center"
      >
        {children}
      </TooltipBasic>
    </div>
  );
};

export default Tab;

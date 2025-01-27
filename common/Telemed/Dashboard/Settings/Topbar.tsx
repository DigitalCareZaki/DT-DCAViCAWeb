'use server';

import type { ServerComponentProps } from '@types';
import type { TopbarProps } from './types';

const Topbar: ServerComponentProps<TopbarProps> = async () => {
  return (
    <div className="flex w-full items-center justify-between">
      <span className="text-md font-semibold text-gray-600">
        Availability Settings
      </span>
    </div>
  );
};

export default Topbar;

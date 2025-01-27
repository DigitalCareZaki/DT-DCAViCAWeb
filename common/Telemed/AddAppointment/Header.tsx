'use server';

import type { ServerComponent } from '@types';

const Header: ServerComponent = async () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <span className="screen-title">Add Appointments</span>
      </div>
    </div>
  );
};

export default Header;

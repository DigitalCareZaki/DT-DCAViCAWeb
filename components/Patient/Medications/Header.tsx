'use server';

import type { ServerComponent } from '@types';

const Header: ServerComponent = async () => {
  return (
    <div className="flex w-full justify-between">
      <span className="screen-title">Today Medications</span>
    </div>
  );
};

export default Header;

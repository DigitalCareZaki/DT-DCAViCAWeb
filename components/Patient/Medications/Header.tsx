'use server';

import type { ServerComponent } from '@types';

const Header: ServerComponent = async () => {
  return (
    <div className="flex w-full justify-between">
      <span className="screen-title">Today&apos;s Medication</span>
    </div>
  );
};

export default Header;

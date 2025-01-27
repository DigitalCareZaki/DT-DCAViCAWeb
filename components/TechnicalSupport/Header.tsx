'use server';

import type { ServerComponent } from '@types';

const Header: ServerComponent = async () => {
  return (
    <div className="h-fit w-full">
      <h2 className="text-2xl font-bold text-primary">Technical Support</h2>
    </div>
  );
};

export default Header;

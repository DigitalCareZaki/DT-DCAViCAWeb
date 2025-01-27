'use server';

import { PageInfo } from '@common';

import type { ServerComponent } from '@types';

const Settings: ServerComponent = async () => {
  return (
    <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pl-4  font-poppins">
      <PageInfo />
    </div>
  );
};

export default Settings;

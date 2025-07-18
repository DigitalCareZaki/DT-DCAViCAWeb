'use server';

import Header from '../components/Header';
import Form from './Form';

import type { ServerComponent } from '@types';

const Settings: ServerComponent = async () => {
  return (
    <div className="hidescrollbar flex h-full w-full flex-col gap-6 overflow-y-scroll px-4">
      {/* <Header /> */}
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-fit w-[70%] flex-col rounded-lg bg-white py-10 pb-20">
          <div className="px-10">
            <span className="text-xl font-semibold text-gray-600">
              Doctor's Availability Calendar Settings
            </span>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Settings;

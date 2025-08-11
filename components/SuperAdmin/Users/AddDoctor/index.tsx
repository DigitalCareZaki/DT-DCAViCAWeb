'use server';

import { PageInfo } from '@common';
import Form from './Form';

import type { ServerComponent } from '@types';

const AddDoctor: ServerComponent = async () => {
  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto pl-4 font-poppins">

      <div className="mt-6">
        <PageInfo />
      </div>
      <div className="flex h-full w-full justify-center pb-10">
        <Form />
      </div>
    </div>
  );
};

export default AddDoctor;

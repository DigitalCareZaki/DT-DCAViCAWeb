'use server';

import { PageInfo } from '@common';
import Form from './Form';

import type { ServerComponent } from '@types';

const AddBranch: ServerComponent = async () => {
  return (
    <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pl-4  font-poppins">
      <PageInfo />
      <Form />
    </div>
  );
};

export default AddBranch;

'use server';

import { PageInfo } from '@common';

import Form from './Form';

import type { ServerComponent } from '@types';

const AssignTablet: ServerComponent = async () => {
  return (
    <div className="mt-10 flex h-full flex-col gap-6 overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      <div className="mt-10 flex h-full w-full justify-center pb-40">
        <Form />
      </div>
    </div>
  );
};

export default AssignTablet;

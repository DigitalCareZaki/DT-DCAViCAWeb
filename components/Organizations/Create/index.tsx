'use server';

import { PageInfo } from '@common';
import Form from './Form';

import { ServerComponent } from '@types';

const Create: ServerComponent = async () => {
  return (
    <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      <div className="mb-96 mt-10 flex h-full w-full justify-center">
        <Form />
      </div>
    </div>
  );
};

export default Create;

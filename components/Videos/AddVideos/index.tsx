'use server';

import Form from './Form';

import type { ServerComponent } from '@types';

const AddVideos: ServerComponent = async () => {
  return (
    <div className="mt-10 flex flex-col gap-6 font-poppins">
      <div className="mt-10 flex w-full justify-center pb-12">
        <Form />
      </div>
    </div>
  );
};

export default AddVideos;

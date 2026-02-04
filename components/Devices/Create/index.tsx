'use server';

import { PageInfo } from '@common';

import Form from './Form';

import type { ServerComponentProps } from '@types';
import type { CreateDeviceProps } from './Form/types';

const CreateDevice: ServerComponentProps<CreateDeviceProps> = async ({
  data,
}) => {
  return (
    <div className="mt-4 flex flex-col gap-6 font-poppins">
      <PageInfo />
      <div className="mt-4 flex w-full justify-center pb-10">
        <Form data={data} />
      </div>
    </div>
  );
};

export default CreateDevice;

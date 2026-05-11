'use server';

import Form from './Form';

import type { ServerComponentProps } from '@types';
import type { CreateTabletProps } from './Form/types';

const CreateTablet: ServerComponentProps<CreateTabletProps> = async ({
  data,
}) => {
  return (
    <div className="mt-10 flex flex-col gap-6 font-poppins">
      <div className="mt-10 flex w-full justify-center pb-12">
        <Form data={data} />
      </div>
    </div>
  );
};

export default CreateTablet;

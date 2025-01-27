'use server';

import Form from './Form';

import type { ServerComponent } from '@types';

const ChangePassword: ServerComponent = async () => {
  return (
    <div className="flex h-full w-full flex-col gap-6 pt-6">
      <Form />
    </div>
  );
};

export default ChangePassword;

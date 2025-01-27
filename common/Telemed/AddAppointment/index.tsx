'use server';

import Header from './Header';
import Form from './Form';

import type { ServerComponent } from '@types';

const AddAppointment: ServerComponent = async () => {
  return (
    <div className="flex h-full w-[90vw] flex-col gap-6 pt-6 mx-auto">  {/* 90% width, centered */}
      <Header />
      <div className="mt-10 flex h-full w-full flex-col items-center">
        <Form />
      </div>
    </div>
  );
};

export default AddAppointment;

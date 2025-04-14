'use server';

import Form from './Form';
import { ButtonPrimary, PageInfo } from '@common';
import ChangePasswordModal from './ChangePasswordModal';
import type { ServerComponent } from '@types';
import Table from './Table';
const ChangePassword: ServerComponent = async () => {
  return (
    <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pl-4 font-poppins">
      {/* <span className='text-[1.5rem] font-semibold tracking-widest text-gray-main sm:text-[1.75rem] md:text-[2rem]'>Change Password</span> */}

      {/* // add pincode button and open modal  */}
      <div className="flex justify-end">
        <ChangePasswordModal />
      </div>

      <div className="mt-10 flex h-full w-full justify-center pb-40">
        <Table />
      </div>
    </div>
    // <div className="flex h-full w-full flex-col gap-6 pt-6">
    //   <Form />
    // </div>
  );
};

export default ChangePassword;

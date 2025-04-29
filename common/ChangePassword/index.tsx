'use server';

import Form from './Form';
import { ButtonPrimary, PageInfo } from '@common';
import ChangePasswordModal from './ChangePasswordModal';
import type { ServerComponent } from '@types';
import Table from './Table';
const ChangePassword: ServerComponent = async () => {

  // if (!patient) throw new Error('Patient id not define');

  // const type = await getUserTypeHeaders();
  // const data = await getPatientDoctors(patient, undefined, type?.toLowerCase());

  // if (!data.success) return <></>;

  const data: any = {
    data: [
      {
        id: 1,
        title: 'Title One',
        description: 'Description One',
        status: 'Active',
        createdAt: '2023-05-12T12:00:00.000Z',
      },
      {
        id: 2,
        title: 'Title Two',
        description: 'Description Two',
        status: 'False',
        createdAt: '2023-05-12T12:00:00.000Z',
      },
      {
        id: 3,
        title: 'Title Three',
        description: 'Description Three',
        status: 'Active',
        createdAt: '2023-05-12T12:00:00.000Z',
      },
      {
        id: 4,
        title: 'Title Four',
        description: 'Description Four',
        status: 'Active',
        createdAt: '2023-05-12T12:00:00.000Z',
      },
      {
        id: 5,
        title: 'Title Five',
        description: 'Description Five',
        status: 'Active',
        createdAt: '2023-05-12T12:00:00.000Z',
      },
      {
        id: 6,
        title: 'Title Six',
        description: 'Description Six',
        status: 'Active',
        createdAt: '2023-05-12T12:00:00.000Z',
      },
      {
        id: 7,
        title: 'Title Seven',
        description: 'Description Seven',
        status: 'Active',
        createdAt: '2023-05-12T12:00:00.000Z',
      },
      {
        id: 8,
        title: 'Title Eight',
        description: 'Description Eight',
        status: 'Active',
        createdAt: '2023-05-12T12:00:00.000Z',
      },
      {
        id: 9,
        title: 'Title Nine',
        description: 'Description Nine',
        status: 'Active',
        createdAt: '2023-05-12T12:00:00.000Z',
      },
      {
        id: 10,
        title: 'Title Ten',
        description: 'Description Ten',
        status: 'Active',
        createdAt: '2023-05-12T12:00:00.000Z',
      },
      {
        id: 11,
        title: 'Title Eleven',
        description: 'Description Eleven',
        status: 'Active',
        createdAt: '2023-05-12T12:00:00.000Z',
      },
      {
        id: 12,
        title: 'Title Twelve',
        description: 'Description Twelve',
        status: 'Active',
        createdAt: '2023-05-12T12:00:00.000Z',
      },

    ],
    pagination: {
      totalItems: 12,
      perPage: 10,
      currentPage: 1,
      totalPages: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null
    }
  }




  return (
    <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pl-4 font-poppins">
      {/* <span className='text-[1.5rem] font-semibold tracking-widest text-gray-main sm:text-[1.75rem] md:text-[2rem]'>Change Password</span> */}

      {/* // add pincode button and open modal  */}
      <div className="flex justify-end">
        <ChangePasswordModal />
      </div>

      <div className="mt-10 flex h-full w-full justify-center pb-40">
        <Table changepasswordData={data} />
      </div>
    </div>
    // <div className="flex h-full w-full flex-col gap-6 pt-6">
    //   <Form />
    // </div>
  );
};

export default ChangePassword;

'use server';

import { PageInfo } from '@common';

import Form from './Form';
import { PrimaryBreadCrumb } from '@common'; // Import the breadcrumb component

import type { ServerComponent } from '@types';

interface Props {
  searchParams: Record<string, string>;
}

const AddEMR = async ({ searchParams }: Props) => {

  return (
    <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pb-96 font-poppins">
      <div className="flex h-fit w-full items-center justify-between">
        <span className="text-[1.5rem] font-semibold tracking-widest text-gray-main sm:text-[1.75rem] md:text-[2rem]">
          Add {searchParams.type.split('?')[0]}
        </span>
        <PrimaryBreadCrumb title={searchParams.type.split('?')[0] || ''} />
      </div>
      {/* <PageInfo searchParam={searchParams.type.split('?')[0]} /> */}
      <div className="mt-10 flex h-full w-full justify-center pb-40">
        <Form />
      </div>
    </div>
  );
};

export default AddEMR;

'use server';

import { ButtonPrimary, PageInfo } from '@common';
import Form from './Form';
import Table from './Table';
import type { ServerComponent } from '@types';
import PincodeClient from './PincodeModal';
import { getPasswordList } from '@actions';


const Pincode: ServerComponent = async () => {


  const data = await getPasswordList(1, 10);
  const pincodeData = data?.data?.data?.filter((item: any) => item.type === 'PIN');

  if (!data.success) return <></>;

  return (
    <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pl-4 font-poppins">
      <PageInfo />
      {/* // add pincode button and open modal  */}
      <div className="flex justify-end">
        <PincodeClient />
      </div>

      <div className="mt-10 flex h-full w-full justify-center pb-40">
        <Table pinCodes={pincodeData} data={data?.data} />
        {/* <Form /> */}
      </div>
    </div>
  );
};

export default Pincode;

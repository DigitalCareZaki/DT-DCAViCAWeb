'use server';

import { PageInfo } from '@common';
import { getPatientContactsForDoctor } from '@service';
import Header from './Header';
import Table from './Table';
import type { ServerComponentProps } from '@types';
import type { EMRProps } from './types';

const Contacts: ServerComponentProps<any> = async () => {


  const getAllContacts = await getPatientContactsForDoctor();


  if (!getAllContacts.success) return <></>;


  return (
    <div className="hidescrollbar mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pb-96 font-poppins">
      <span className='text-[1.5rem] font-semibold tracking-widest text-gray-main sm:text-[1.75rem] md:text-[2rem]'>Contact Details</span>

      {/* <PageInfo /> */}
      {/* <Header patient_id={patient_id} />
      <Table records={res.data} /> */}
      {/* <Header patient_id={patient_id || 'N/A'} /> */}
      <Table getAllContacts={getAllContacts?.data} />
    </div>
  );
};

export default Contacts;

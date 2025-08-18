'use server';

import { getPatientNurses, getUserTypeHeaders } from '@actions';
import Header from './Header';
import Table from './Table';
import Form from './Form';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const AllAppointmentsList: ServerComponentProps<any> = async ({ }) => {

  // const type = await getUserTypeHeaders();

  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      <Header />
      <Table />
      {/* <Form /> */}
    </div>
  );
};

export default AllAppointmentsList;

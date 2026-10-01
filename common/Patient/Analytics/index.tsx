'use server';

import { getPatientNurses, getUserTypeHeaders } from '@actions';
import Table from './Table';
import Form from './Form';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const AnalyticsTab: ServerComponentProps<any> = async ({ }) => {

  // const type = await getUserTypeHeaders();

  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      {/* Table renders the header too, since the search and date filters drive its data */}
      <Table />
      {/* <Form /> */}
    </div>
  );
};

export default AnalyticsTab;

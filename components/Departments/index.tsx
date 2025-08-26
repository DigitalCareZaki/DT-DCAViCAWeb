'use server';

import { PageInfo } from '@common';
import Header from './Home/Header';
import Table from './Home/Table';

import { getDepartments } from '@service';

import type { ServerComponent } from '@types';

const Departments: ServerComponent = async () => {
  const res = await getDepartments();

  console.log('departments >>>', res.data);

  if (!res.success) return <></>;

  return (
    <div className="overflow-y-scroll pb-96 font-poppins">
      {/* <PageInfo /> */}
      <Header />
      <Table data={res.data} />
    </div>
  );
};

export default Departments;

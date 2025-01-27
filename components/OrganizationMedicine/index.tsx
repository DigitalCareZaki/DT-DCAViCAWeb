'use server';

import { PageInfo } from '@common';

import Table from './Table';
import Header from './Table/Header';

import { getOrganizationMedicines } from '@service';

import type { ServerComponent } from '@types';

const OrganizationMedicine: ServerComponent = async () => {
  const res = await getOrganizationMedicines();

  if (!res.success) return <></>;

  return (
    <div className="h-screen overflow-y-scroll pb-96 font-poppins">
      <PageInfo />
      <Header />
      <Table data={res.data} />
    </div>
  );
};

export default OrganizationMedicine;

'use server';

import { getUserTypeHeaders } from '@actions';
import { getBranchesSuperAdmin } from '@service';

import { ServerTable, ExportButton } from '@common';

import BranchRenderTable from './BranchRenderTable';

import type { ServerComponent } from '@types';

const BranchTable: ServerComponent = async () => {
  const userType = await getUserTypeHeaders();
  const data = await getBranchesSuperAdmin();

  if (!data.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col items-end gap-4">
      {/* <ExportButton
        data={data.data.map((el) => ({
          emr: el.emr,
          ...el.user,
        }))}
        headers={[
          {
            label: 'First name',
            key: 'first_name',
          },
          {
            label: 'Middle name',
            key: 'middle_name',
          },
          {
            label: 'Last name',
            key: 'last_name',
          },
          {
            label: 'EMR',
            key: 'emr',
          },
          {
            label: 'Email',
            key: 'email',
          },
          {
            label: 'Phone',
            key: 'phone_number',
          },
        ]}
        filename="Patient List Data"
      /> */}


      <div className="relative w-full overflow-x-auto pb-12 shadow-md sm:rounded-lg">
        <h1 className="text-[1.5rem] !float-left font-semibold tracking-widest text-gray-main sm:text-[1.75rem] md:text-[2rem]">
          Branches List
        </h1>
        <ServerTable
          heads={[
            'name',
            'email',
            'phone number',
            'organization',
            'address',
          ]}
        >
          <BranchRenderTable
            userType={userType?.toLowerCase() ?? 'doctor'}
            data={data.data}
          />
        </ServerTable>
      </div>
    </div>
  );
};

export default BranchTable;

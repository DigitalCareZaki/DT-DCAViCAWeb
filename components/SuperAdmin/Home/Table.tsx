'use server';

import { getUserTypeHeaders } from '@actions';
import { getOrganizationPatients } from '@service';

import { ServerTable, ExportButton } from '@common';

import RenderTable from './RenderTable';

import type { ServerComponent } from '@types';

const Table: ServerComponent = async () => {
  const userType = await getUserTypeHeaders();
  const data = await getOrganizationPatients();

  if (!data.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col items-end gap-4">
      <ExportButton
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
      />

      <div className="relative w-full overflow-x-auto pb-12 shadow-md sm:rounded-lg">
        <ServerTable
          heads={[
            'Patient Name',
            'Patient Email',
            'EMR',
            'Glucose',
            'Blood Pressure',
            'Temperature',
            'Pulse Oximeter',
            'ECG',
            'Medication',
            'Height',
            'Weight',
          ]}
        >
          <RenderTable
            userType={userType?.toLowerCase() ?? 'doctor'}
            data={data.data}
          />
        </ServerTable>
      </div>
    </div>
  );
};

export default Table;

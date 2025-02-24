'use server';

import { ServerTable } from '@common';

import RenderTable from './RenderTable';

import type { ServerComponentProps } from '@types';
import type { TableProps } from './types';

const Table: ServerComponentProps<TableProps> = async ({ userType, data }) => {
  console.log(data, '===>>> table server');
  return (
    <div className="relative overflow-x-auto pb-8 shadow-md sm:rounded-lg">
      <ServerTable
        heads={[
          'Patient Name',
          'Patient Email',
          'EMR',
          'Glucose',
          'Blood Pressure',
          'Temperature',
          'Medication',
          'SPO2',
          'ECG',
        ]}
      >
        <RenderTable userType={userType} data={data} />
      </ServerTable>
    </div>
  );
};

export default Table;

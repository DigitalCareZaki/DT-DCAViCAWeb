'use server';

import { getName } from '@init-globals';

import { ServerTable } from '@common';

import type { ServerComponentProps, PatientReadingRange } from '@types';

const RenderType = {
  BLOODGLUCOSE: 'Blood Glucose',
  BLOODPRESSURE: 'Blood Pressure',
  TEMPERATURE: 'Temperature',
  SPO2: 'SPO2',
  ECG: 'ECG',
};

const Render = ({ data }: { data: PatientReadingRange[] }) =>
  data.map((item) => (
    <tr key={item.id} className="border-b odd:bg-white even:bg-gray-50">
      <td className="px-6 py-4">{RenderType[item.type]}</td>
      <td className="px-6 py-4">
        {item.type === 'BLOODPRESSURE'
          ? `Systolic Low: ${item.range[0]}, Diastolic Low: ${item.range[2]}`
          : item.range[0]}
      </td>
      <td className="px-6 py-4">
        {item.type === 'BLOODPRESSURE'
          ? `Systolic High: ${item.range[1]}, Diastolic High: ${item.range[3]}`
          : item.range[1]}
      </td>
      <td className="px-6 py-4">{item.send_sms ? 'Yes' : 'No'}</td>
      <td className="px-6 py-4">{item.send_email ? 'Yes' : 'No'}</td>
      <td className="px-6 py-4">
        {getName({
          first_name: item.user.first_name,
          middle_name: item.user.middle_name,
          last_name: item.user.last_name,
        })}
      </td>
      <td className="px-6 py-4">
        {new Date(item.created_at).toLocaleString()}
      </td>
    </tr>
  ));

const AlertTable: ServerComponentProps<{
  data: PatientReadingRange[];
}> = async ({ data }) => {
  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
      <ServerTable
        heads={[
          'Type',
          'Low',
          'High',
          'SMS',
          'Email',
          'Created By',
          'Created At',
        ]}
      >
        <Render data={data} />
      </ServerTable>
    </div>
  );
};

export default AlertTable;

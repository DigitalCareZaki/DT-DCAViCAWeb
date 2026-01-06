'use client';

import { InputBasic, ExportButton } from '@common';

import type { ClientComponentProps } from '@types';
import type { HeaderProps } from './types';

const Header: ClientComponentProps<any> = ({ data }) => {

  console.log('data <<>>>><<<>>>', data);

  return (
    <div className="flex h-fit w-full flex-col items-start gap-4 p-4 md:flex-row md:items-center md:justify-between md:gap-0">
      <div className="w-full md:w-auto">
        <span className="screen-title text-lg font-semibold md:text-xl lg:text-2xl">
          Patients
        </span>
      </div>
      <div className="w-full md:w-auto">
        <div className="flex flex-row items-center gap-4">
          <InputBasic
            placeholder="Name, email or ID"
            icon="IoSearch"
            borderTheme
          />
          <ExportButton
            data={data?.data?.map((el: any) => ({
              patient_name: `${el?.patient?.first_name} ${el?.patient?.middle_name || ''} ${el?.patient?.last_name}`,
              patient_email: el?.patient?.email,
              glucose: el?.measurements?.BLOODGLUCOSE?.status || '-',
              blood_pressure: el?.measurements?.BLOODPRESSURE?.status || '-',
              temperature: el?.measurements?.TEMPERATURE?.status || '-',
              spo2: el?.measurements?.SPO2?.status || '-',
              ecg: el?.measurements?.ECG?.status || '-',
            }))}
            headers={[
              {
                label: 'Patient name',
                key: 'patient_name',
                width: '18%',
              },
              {
                label: 'Patient email',
                key: 'patient_email',
                width: '27%',
              },
              {
                label: 'Glucose',
                key: 'glucose',
                width: '11%',
              },
              {
                label: 'Blood Pressure',
                key: 'blood_pressure',
                width: '11%',
              },
              {
                label: 'Temperature',
                key: 'temperature',
                width: '11%',
              },
              {
                label: 'SPO2',
                key: 'spo2',
                width: '11%',
              },
              {
                label: 'ECG',
                key: 'ecg',
                width: '11%',
              },
            ]}
            filename="Patient List Data"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

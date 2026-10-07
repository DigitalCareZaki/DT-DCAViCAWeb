'use client';

import { InputBasic, ExportButton } from '@common';

import type { ClientComponentProps } from '@types';
import type { HeaderProps } from './types';

const Header: ClientComponentProps<any> = ({ data, searchTerm, setSearchTerm }) => {



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
            placeholder="Name, email"
            icon="IoSearch"
            borderTheme
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
          />
          <ExportButton
            data={data?.data?.map((el: any) => {
              const patient = el?.patient;
              return {
                patient_name: patient ? `${patient.first_name || ''} ${patient.middle_name || ''} ${patient.last_name || ''}` : 'Unknown',
                patient_email: patient?.email || 'N/A',
                glucose: el?.measurements?.BLOODGLUCOSE?.status || '-',
                blood_pressure: el?.measurements?.BLOODPRESSURE?.status || '-',
                temperature: el?.measurements?.TEMPERATURE?.status || '-',
                spo2: el?.measurements?.SPO2?.status || '-',
              };
            })}
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
            ]}
            filename="Patient List Data"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

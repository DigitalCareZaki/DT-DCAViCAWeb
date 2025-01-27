'use server';

import { getDoctorPatientsFromVl } from '@service';

import type { ServerComponent } from '@types';

import Patients from './Patients';

const Vivalink: ServerComponent = async () => {
  const res = await getDoctorPatientsFromVl();

  if (!res.success || Object.keys(res.data).length === 0) return <></>;

  return (
    <div className="flex w-full flex-col gap-4 pt-6">
      <span className="screen-title">AViCardia Patients</span>
      {<Patients data={res.data} />}
    </div>
  );
};

export default Vivalink;

import { getDoctorPatientsFromVl, getAssignedPatientsVl } from '@service';
import { getUserTypeHeaders } from '@actions';

import type { ServerComponentProps } from '@types';

import Patients from './Patients';

const Vivalink: ServerComponentProps<{ searchParams: { [key: string]: string | string[] | undefined } }> = async ({ searchParams }) => {
  const page = typeof searchParams?.page === 'string' ? parseInt(searchParams.page) : 1;

  const [vlRes, avicaRes] = await Promise.all([
    getDoctorPatientsFromVl(),
    getAssignedPatientsVl(page)
  ]);
  return (
    <div className="flex w-full flex-col gap-4 pt-6 px-10">
      <div className="flex items-center justify-between">
        <span className="screen-title text-2xl font-bold font-poppins text-gray-800">AViCardia Monitoring Hub</span>
      </div>
      <Patients
        data={vlRes.success ? vlRes.data : {}}
        avicaPatients={avicaRes.success ? avicaRes.data.data : []}
        pagination={avicaRes.success ? avicaRes.data.pagination : undefined}
      />
    </div>
  );
};

export default Vivalink;

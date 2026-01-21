import { getDoctorPatientsFromVl, getPatientList } from '@service';
import { getUserTypeHeaders } from '@actions';

import type { ServerComponent } from '@types';

import Patients from './Patients';

const Vivalink: ServerComponent = async () => {
  const userType = await getUserTypeHeaders();
  const [vlRes, avicaRes] = await Promise.all([
    getDoctorPatientsFromVl(),
    getPatientList(userType?.toLowerCase(), 1, 100) // Get more patients for management
  ]);

  return (
    <div className="flex w-full flex-col gap-4 pt-6 px-10">
      <div className="flex items-center justify-between">
        <span className="screen-title text-2xl font-bold font-poppins text-gray-800">AViCardia Monitoring Hub</span>
      </div>
      <Patients
        data={vlRes.success ? vlRes.data : {}}
        avicaPatients={avicaRes.success ? avicaRes.data.data : []}
      />
    </div>
  );
};

export default Vivalink;

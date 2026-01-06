'use server';

import Charts from './Charts';
import PatientsSection from './PatientsSection';
import { getUserTypeHeaders, getPatientList } from '@actions';

import type { Props } from './types';
import type { ServerComponentProps } from '@types';

const HomePrimary: ServerComponentProps<Props> = async ({
  appointments,
  compliance,
  rag,
}) => {
  const userType = await getUserTypeHeaders();
  const initialData = await getPatientList(userType?.toLowerCase(), 1, 10);



  // if (typeof userType !== 'string') return <>HELLLLLLLLLLLLLLLLLO</>;

  if (!initialData.success) return <>TESTING</>;

  return (
    <div className="mt-10 flex h-full w-full flex-col gap-8 p-6 sm:p-8 lg:p-10">
      {/* Client component below */}
      <Charts appointments={appointments} compliance={compliance} rag={rag} />

      {/* Header and Table Section */}
      <PatientsSection
        initialData={initialData?.data}
        userType={userType?.toLowerCase()}
        initialPagination={initialData?.data?.pagination}
      />
    </div>
  );
};

export default HomePrimary;

'use server';

import Header from './Header';
import Table from './Table';
import Charts from './Charts';

import { getUserTypeHeaders, getPatientList } from '@actions';

import type { Props } from './types';
import type { ServerComponentProps } from '@types';

const HomePrimary: ServerComponentProps<Props> = async ({
  appointments,
  compliance,
  rag,
}) => {
  const userType = await getUserTypeHeaders();
  const data = await getPatientList(userType?.toLowerCase());
  console.log(data, '===>>> outside');
  if (typeof userType !== 'string') return <></>;

  if (!data.success) return <></>;

  return (
    <div className="mt-10 flex h-full w-full flex-col gap-8 overflow-y-scroll p-6 sm:p-8 lg:p-10">
      {/* Client component below */}
      <Charts appointments={appointments} compliance={compliance} rag={rag} />

      {/* Header and Table Section */}
      <div className="flex h-auto w-full flex-col gap-8 text-white">
        <Header data={data?.data} />
        <Table userType={userType.toLowerCase()} data={data?.data} />
      </div>
    </div>
  );
};

export default HomePrimary;

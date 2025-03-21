'use server';

import { Suspense } from 'react';

import { getUserTypeHeaders, getPatientList } from '@actions';

import Header from './Header';
import ComplianceSkeleton from './ComplianceSkeleton';
import ComplianceRender from './ComplianceRender';

import type { ServerComponent } from '@types';

const Compliance: ServerComponent = async () => {
  const user = await getUserTypeHeaders();

  if (!user) return <></>;

  const data = await getPatientList(user.toLocaleUpperCase());
  console.log('compliance kia data a raha han >>', data);

  if (!data.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col gap-6 pt-6">
      <Header />
      <Suspense fallback={<ComplianceSkeleton />}>
        <ComplianceRender data={data.data} />
      </Suspense>
    </div>
  );
};

export default Compliance;

'use server';

import { getDoctorProfile } from '@service';
import { getUser } from '@actions';

import Form from './Form';

import type { ServerComponent } from '@types';

const PrimaryProfile: ServerComponent = async () => {
  const user = await getUser();
  const res = await getDoctorProfile(user?.role?.toLocaleLowerCase() as any);

  if (!res.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col gap-6 pt-6">
      <Form data={res.data} />
    </div>
  );
};

export default PrimaryProfile;



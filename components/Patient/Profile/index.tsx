'use server';

import { PageInfo } from '@common';
import Form from './Form';

import type { ServerComponentProps, PatientProfileData } from '@types';

const Profile: ServerComponentProps<PatientProfileData> = async ({
  ...data
}) => {
  return (
    <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pb-[70rem] pl-4 font-poppins">
      <PageInfo />
      <div className="mt-10 flex h-full w-full justify-center pb-96">
        <Form {...data} />
      </div>
    </div>
  );
};

export default Profile;

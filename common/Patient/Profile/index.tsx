'use server';

import Image from 'next/image';

import { InputBasic } from '../../Input';
import { getPatientProfile, getUserTypeHeaders } from '@actions';
import { getName, getProfilePicture } from '@init-globals';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const PatientProfile: ServerComponentProps<Props> = async ({ patient }) => {
  if (!patient) throw new Error('Patient id not define');
  const userType = await getUserTypeHeaders();

  const res = await getPatientProfile(patient, userType?.toLowerCase());

  if (!res.success) return <></>;

  const profileFields = [
    {
      label: 'EMR',
      placeholder: 'Patient EMR',
      title: 'EMR',
      value: res.data.emr,
    },
    {
      label: 'Date of birth',
      placeholder: 'Patient date of birth',
      title: 'Patient date of birth',
      value: new Date(res.data.user.dob).toLocaleDateString(),
    },
    {
      label: 'First Name',
      placeholder: 'Patient first name',
      title: 'Patient first name',
      value: res.data.user.first_name,
    },
    {
      label: 'Last Name',
      placeholder: 'Patient last name',
      title: 'Patient last name',
      value: res.data.user.last_name,
    },
    {
      label: 'Email',
      placeholder: 'Patient email',
      title: 'Patient email',
      value: res.data.user.email,
    },
    {
      label: 'Phone',
      placeholder: 'Patient phone number',
      title: 'Patient phone number',
      value: res.data.user.phone_number,
    },
    {
      label: 'Weight',
      placeholder: 'Patient weight',
      title: 'Patient weight',
      value: res.data.weight?.getWeight() ?? 'N/A',
    },
    {
      label: 'Height',
      placeholder: 'Patient height',
      title: 'Patient height',
      value: res.data.height?.getHeight() ?? 'N/A',
    },
  ];

  return (
    <div className="flex h-full w-full flex-col items-center gap-10 overflow-y-scroll px-10 pb-40 pt-20">
      <div className="flex flex-col items-center gap-4 text-gray-600">
        <div className="relative h-32 w-32 rounded-full">
          <Image
            src={getProfilePicture(res.data.user.uri)}
            alt="profile-pic-patient"
            className="rounded-full object-cover"
            fill
          />
        </div>
        <span className="text-xl font-bold">
          {getName({
            ...res.data.user,
          })}
        </span>
      </div>
      <div className="flex w-full max-w-6xl flex-col gap-6">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {profileFields.map((field) => (
            <InputBasic
              key={field.label}
              label={field.label}
              placeholder={field.placeholder}
              disabled
              hideInfo
              labelVariant="tiny"
              title={field.title}
              value={field.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;

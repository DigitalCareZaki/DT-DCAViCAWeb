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

  return (
    <div className="flex h-full w-full flex-col items-center gap-10 overflow-y-scroll px-10 pb-40 pr-0 pt-20">
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
      <div className="flex w-[80%] flex-col gap-6">
        <div className="flex w-full items-center gap-6">
          <div className="w-1/2">
            <InputBasic
              label="Social Security Number"
              placeholder="Patient social security number"
              title="Patient social security number"
              disabled
              hideInfo
              labelVariant="tiny"
              value={res.data.emr}
            />
          </div>
          <div className="w-1/2">
            <InputBasic
              label="Date of birth"
              placeholder="Patient date of birth"
              title="Patient date of birth"
              disabled
              hideInfo
              labelVariant="tiny"
              value={new Date(res.data.user.dob).toLocaleDateString()}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-6">
          <div className="w-1/2">
            <InputBasic
              label="Contract Identifier"
              placeholder="Patient contract identifier"
              disabled
              hideInfo
              labelVariant="tiny"
              title="Patient contract identifier"
              value="131424-336-2764"
            />
          </div>
          <div className="w-1/2">
            <InputBasic
              label="Weight"
              placeholder="Patient weight"
              disabled
              hideInfo
              labelVariant="tiny"
              title="Patient weight"
              value={res.data.weight?.getWeight() ?? 'N/A'}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-6">
          <div className="w-1/2">
            <InputBasic
              label="Subscriber ID"
              placeholder="Patient subscriber id"
              disabled
              hideInfo
              labelVariant="tiny"
              title="Patient subscriber id"
              value="1234-XYZ"
            />
          </div>
          <div className="w-1/2">
            <InputBasic
              label="Height"
              placeholder="Patient height"
              disabled
              hideInfo
              labelVariant="tiny"
              title="Patient height"
              value={res.data.height?.getHeight() ?? 'N/A'}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-6">
          <div className="w-1/2">
            <InputBasic
              label="First Name"
              placeholder="Patient first name"
              disabled
              hideInfo
              labelVariant="tiny"
              title="Patient first name"
              value={res.data.user.first_name}
            />
          </div>
          <div className="w-1/2">
            <InputBasic
              label="Language"
              placeholder="Patient language"
              disabled
              hideInfo
              labelVariant="tiny"
              title="Patient language"
              value="English"
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-6">
          <div className="w-1/2">
            <InputBasic
              label="Last Name"
              placeholder="Patient last name"
              disabled
              hideInfo
              labelVariant="tiny"
              title="Patient last name"
              value={res.data.user.last_name}
            />
          </div>
          <div className="w-1/2">
            <InputBasic
              label="Measurement system"
              placeholder="Patient measurement system"
              disabled
              hideInfo
              labelVariant="tiny"
              title="Patient measurement system"
              value="Standard"
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-6">
          <div className="w-1/2">
            <InputBasic
              label="Email"
              placeholder="Patient email"
              disabled
              hideInfo
              labelVariant="tiny"
              title="Patient email"
              value={res.data.user.email}
            />
          </div>
          <div className="w-1/2">
            <InputBasic
              label="Time Zone"
              placeholder="Patient time zone"
              disabled
              hideInfo
              labelVariant="tiny"
              title="Patient time zone"
              value={res.data.user.user_meta_data[0]?.timezone ?? 'N/A'}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-6">
          <div className="w-1/2">
            <InputBasic
              label="Phone"
              placeholder="Patient phone number"
              disabled
              hideInfo
              labelVariant="tiny"
              title="Patient phone number"
              value={res.data.user.phone_number}
            />
          </div>
          <div className="w-1/2">
            <InputBasic
              label="Ethnicity"
              placeholder="Patient ethnicity"
              disabled
              hideInfo
              labelVariant="tiny"
              title="Patient ethnicity"
              value="N/A"
            />
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="relative h-44 w-full rounded-md bg-black">
            <Image
              src="https://i.stack.imgur.com/LFBBq.png"
              alt="map-image"
              className="w-full rounded-md object-cover"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;

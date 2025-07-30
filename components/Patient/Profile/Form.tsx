'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

import { FaTransgender } from '@react-icons/all-files/fa/FaTransgender';
import { FaQuestion } from '@react-icons/all-files/fa/FaQuestion';
import { IoMdMale } from '@react-icons/all-files/io/IoMdMale';
import { IoFemale } from '@react-icons/all-files/io5/IoFemale';
import { MdTitle } from '@react-icons/all-files/md/MdTitle';

import { InputBasic, ButtonPrimary, DropdownSecondary } from '@common';
import { getProfilePicture } from '@init-globals';
import { useImagePicker } from '@clienthooks';

import useForm from './useForm';

import type { ClientComponentProps, PatientProfileData } from '@types';

const Form: ClientComponentProps<PatientProfileData> = ({ ...data }) => {
  const router = useRouter(); // Initialize the router here
  const [profileData, setProfileData] = useState<PatientProfileData>(data);
  const [
    register,
    onSubmit,
    errors,
    loading,
    error,
    handleSelect,
    selectors,
    handleFilePicker,
    setSelectors,
  ] = useForm(profileData);

  // Define the expected result type from onSubmit
  type SubmitResult = {
    success: boolean;
    updatedData?: PatientProfileData;
  };

  // Update local state after successful save
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await (onSubmit(e) as unknown as Promise<SubmitResult | void>);
    if (result && result.success && result.updatedData) {
      setProfileData(result.updatedData);
      // Update selectors with new profile picture URI
      setSelectors((prev) => ({
        ...prev,
        profilePicture: result.updatedData?.uri || '',
      }));
    }
  };

  const handleClose = () => {
    router.push('/patient'); // Redirect to PatientLayout page
  };

  return (
    <form
      onSubmit={handleSave}
      className="flex h-fit w-1/2 flex-col gap-5 rounded-2xl bg-white p-6 pb-12"
    >
      <div className="flex w-full items-center justify-center">
        <div className="group relative h-20 w-20 rounded-full">
          <div
            onClick={() => handleFilePicker()}
            className="absolute z-[99] h-full w-full rounded-full bg-black/50 opacity-0 transition duration-200 group-hover:opacity-100"
          />
          <Image
            src={getProfilePicture(selectors.profilePicture)}
            fill
            className="h-full w-full rounded-full object-cover"
            alt="profile-picture"
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            label="First Name"
            placeholder="Patient first name"
            title="First Name"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('first_name')}
            error={!!errors.first_name?.message}
            errorMessage={errors.first_name?.message || '&'}
          />
        </div>
        <div className="w-1/2">
          <InputBasic
            label="Middle Name"
            placeholder="Patient middle name"
            title="Middle Name"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('middle_name')}
            error={!!errors.middle_name?.message}
            errorMessage={errors.middle_name?.message || '&'}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            label="Last Name"
            placeholder="Patient last name"
            title="Last Name"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('last_name')}
            error={!!errors.last_name?.message}
            errorMessage={errors.last_name?.message || '&'}
          />
        </div>
        <div className="w-1/2">
          <InputBasic
            title="Phone number should be unique e.g (+92XXXXXXXXXX)"
            label="Phone Number"
            placeholder="Patient phone number with country code"
            icon="FaSquarePhone"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('phone_number')}
            error={!!errors.phone_number?.message}
            errorMessage={errors.phone_number?.message || '&'}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            title="Email address should be unique"
            label="Email Address"
            placeholder="Patient email address"
            icon="MdEmail"
            type="email"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            disabled
            hookProps={register('email')}
            error={!!errors.email?.message}
            errorMessage={errors.email?.message || '&'}
          />
        </div>
        <div className="w-1/2">
          <InputBasic
            title="Date of birth"
            label="Date of birth"
            placeholder="Patient date of birth"
            icon="FaCalendarAlt"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('dob')}
            error={!!errors.dob?.message}
            errorMessage={errors.dob?.message || '&'}
            disabled
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <DropdownSecondary
            title="Select gender"
            label="Select Gender"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="FaGenderless"
            error={!!errors.gender?.message}
            errorMessage={(errors.gender?.message as string) || '&'}
            selected={selectors.gender.title}
          >
            <>
              <div
                onClick={() => handleSelect('gender')('MALE')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">MALE</span>
                <IoMdMale size={18} />
              </div>
              <div
                onClick={() => handleSelect('gender')('FEMALE')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">FEMALE</span>
                <IoFemale size={18} />
              </div>
              <div
                onClick={() => handleSelect('gender')('TRANS')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">TRANS</span>
                <FaTransgender size={18} />
              </div>
              <div
                onClick={() => handleSelect('gender')('UNKNOWN')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">UNKNOWN</span>
                <FaQuestion size={18} />
              </div>
            </>
          </DropdownSecondary>
        </div>
        <div className="w-1/2">
          <DropdownSecondary
            title="Select patient title"
            label="Select Title"
            borderTheme
            inputWrapperClassName="bg-background"
            icon="MdTitle"
            error={!!errors.title?.message}
            errorMessage={(errors.title?.message as string) || '&'}
            selected={selectors.title.title}
          >
            <>
              <div
                onClick={() => handleSelect('title')('MR')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">MR</span>
                <MdTitle size={18} />
              </div>
              <div
                onClick={() => handleSelect('title')('MS')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">MS</span>
                <MdTitle size={18} />
              </div>
              <div
                onClick={() => handleSelect('title')('MRS')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">MRS</span>
                <MdTitle size={18} />
              </div>
              <div
                onClick={() => handleSelect('title')('MISS')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">MISS</span>
                <MdTitle size={18} />
              </div>
              <div
                onClick={() => handleSelect('title')('MASTER')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">MASTER</span>
                <MdTitle size={18} />
              </div>
              <div
                onClick={() => handleSelect('title')('MADAM')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">MADAM</span>
                <MdTitle size={18} />
              </div>
            </>
          </DropdownSecondary>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            title="Username"
            label="Username"
            placeholder="Patient username"
            icon="FaLock"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            disabled
            hookProps={register('username')}
            error={!!errors.username?.message}
            errorMessage={errors.username?.message || '&'}
          />
        </div>
        <div className="w-1/2">
          <InputBasic
            title="Joining Date"
            label="Joining Date"
            placeholder="Patient joining date"
            icon="FaCalendarAlt"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            disabled
            hookProps={register('created_at')}
            error={!!errors.created_at?.message}
            errorMessage={errors.created_at?.message || '&'}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            title="Last update"
            label="Last update"
            placeholder="Last update"
            icon="FaCalendarAlt"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            disabled
            hookProps={register('updated_at')}
            error={!!errors.updated_at?.message}
            errorMessage={errors.updated_at?.message || '&'}
          />
        </div>
        <div className="w-1/2">
          <InputBasic
            title="EMR"
            label="EMR number"
            placeholder="Patient emr number"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            disabled
            hookProps={register('emr')}
            error={!!errors.emr?.message}
            errorMessage={errors.emr?.message || '&'}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-1/2">
          <InputBasic
            title="Weight"
            label="Weight"
            placeholder="Patient weight"
            icon="TbRulerMeasure"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('weight')}
            error={!!errors.weight?.message}
            errorMessage={errors.weight?.message || '&'}
          />
        </div>
        <div className="w-1/2">
          <InputBasic
            title="Height"
            label="Height"
            placeholder="Patient height"
            icon="TbRulerMeasure"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('height')}
            error={!!errors.height?.message}
            errorMessage={errors.height?.message || '&'}
          />
        </div>
      </div>
      {/* <div className="mt-10 w-full">
        <ButtonPrimary title="Save" name="Save" loading={loading} />
      </div> */}

      <div className="mt-10 flex w-full justify-end gap-4">
        <ButtonPrimary
          title="Save"
          name="Save"
          loading={loading}
        // Add onClick or other props if needed
        />
        <ButtonPrimary
          title="Close"
          name="Close"
          onClick={handleClose} // Navigates to PatientLayout on click
        />
      </div>
    </form>
  );
};

export default Form;

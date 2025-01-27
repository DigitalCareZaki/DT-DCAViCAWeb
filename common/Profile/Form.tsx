'use client';

import { InputBasic, ButtonPrimary } from '@common';

import { useRouter } from 'next/navigation';

import ProfileCard from './ProfileCard';
import useForm from './useForm';

import type { ClientComponentProps } from '@types';
import type { FormProps } from './types';

const Form: ClientComponentProps<FormProps> = ({ data }) => {
  const router = useRouter();
  const [onSubmit, register, errors, loading, error, handleFileProps] =
    useForm(data);

  const handleClose = () => {
    router.push('/doctor'); // Redirect to PatientLayout page
  };
  return (
    < form
      onSubmit={onSubmit}
      method="PATCH"
      className="flex h-full w-full flex-col items-center overflow-y-scroll pb-24"
    >
      <div className="flex w-[45rem] flex-col gap-4">
        <div className="flex w-full gap-4">
          <div className="w-1/2">
            <ProfileCard
              uri={data.uri}
              first_name={data.first_name}
              middle_name={data.middle_name}
              last_name={data.last_name}
              speciality={data?.doctor?.specialities[0]?.title}
              handleFileProps={handleFileProps}
            />
          </div>
          {/* <div className="flex w-1/2 flex-col gap-4">
            <InputBasic
              label="Speciality"
              placeholder="Cardiology"
              borderTheme
              defaultBorder
              hookProps={register('speciality')}
              error={!!errors.speciality?.message?.length}
              errorMessage={errors.speciality?.message || '&'}
              disabled
            />
            <InputBasic
              label="Employee ID"
              placeholder="112233"
              borderTheme
              defaultBorder
              hookProps={register('employeeId')}
              error={!!errors.employeeId?.message?.length}
              errorMessage={errors.employeeId?.message || '&'}
            />
          </div> */}
        </div>

        <div className="flex w-full items-center gap-4">
          <div className="w-1/2">
            <InputBasic
              label="Title"
              placeholder="Enter title"
              borderTheme
              defaultBorder
              hookProps={register('title')}
              error={!!errors.title?.message?.length}
              errorMessage={errors.title?.message || '&'}
            />
          </div>
          <div className="w-1/2">
            <InputBasic
              label="Institution"
              placeholder="Agha Khan"
              borderTheme
              defaultBorder
              hookProps={register('institution')}
              error={!!errors.institution?.message?.length}
              errorMessage={errors.institution?.message || '&'}

            />
          </div>
        </div>

        <div className="flex w-full items-center gap-4">
          <div className="w-1/2">
            <InputBasic
              label="First Name"
              placeholder="Enter First Name"
              borderTheme
              defaultBorder
              hookProps={register('firstName')}
              error={!!errors.firstName?.message?.length}
              errorMessage={errors.firstName?.message || '&'}
            />
          </div>
          <div className="w-1/2">
            <InputBasic
              label="Middle Name"
              placeholder="Enter Middle Name"
              borderTheme
              defaultBorder
              hookProps={register('middleName')}
              error={!!errors.middleName?.message?.length}
              errorMessage={errors.middleName?.message || '&'}
            />
          </div>
        </div>

        <div className="flex w-full items-center gap-4">
          <div className="w-1/2">
            <InputBasic
              label="Last Name"
              placeholder="Enter First Name"
              borderTheme
              defaultBorder
              hookProps={register('lastName')}
              error={!!errors.lastName?.message?.length}
              errorMessage={errors.lastName?.message || '&'}
            />
          </div>
          <div className="w-1/2">
            <InputBasic
              label="Branch"
              placeholder="Enter Branch Name"
              borderTheme
              defaultBorder
              hookProps={register('branch')}
              error={!!errors.branch?.message?.length}
              errorMessage={errors.branch?.message || '&'}
              disabled
            />
          </div>
        </div>

        <div className="flex w-full items-center gap-4">
          <div className="w-1/2">
            <InputBasic
              label="Email"
              placeholder="Enter email"
              borderTheme
              defaultBorder
              hookProps={register('email')}
              error={!!errors.email?.message?.length}
              errorMessage={errors.email?.message || '&'}
              disabled
            />
          </div>
          {/* <div className="w-1/2">
            <InputBasic
              label="NPI Number"
              placeholder="1234-78906542-908"
              borderTheme
              defaultBorder
              hookProps={register('npiNumber')}
              error={!!errors.npiNumber?.message?.length}
              errorMessage={errors.npiNumber?.message || '&'}
              disabled
            />
          </div> */}
          <div className="w-1/2">
            <InputBasic
              label="DOB"
              placeholder="Enter DOB"
              borderTheme
              defaultBorder
              hookProps={register('dob')}
              error={!!errors.dob?.message?.length}
              errorMessage={errors.dob?.message || '&'}
              disabled
            />
          </div>
        </div>

        <div className="flex w-full items-center gap-4">
          <div className="w-1/2">
            <InputBasic
              label="Phone Number"
              placeholder="Enter phone number"
              borderTheme
              defaultBorder
              hookProps={register('phoneNumber')}
              error={!!errors.phoneNumber?.message?.length}
              errorMessage={errors.phoneNumber?.message || '&'}
            />
          </div>
          <div className="w-1/2">
            <InputBasic
              label="Address"
              placeholder="Agha Khan"
              borderTheme
              defaultBorder
              hookProps={register('address')}
              error={!!errors.address?.message?.length}
              errorMessage={errors.address?.message || '&'}
            />
          </div>
        </div>

        <div className="flex w-full items-center gap-4">
          <div className="w-1/2">
            <InputBasic
              label="PMDC Number"
              placeholder="112233"
              borderTheme
              defaultBorder
              hookProps={register('pmdcNumber')}
              error={!!errors.pmdcNumber?.message?.length}
              errorMessage={errors.pmdcNumber?.message || '&'}
            />
          </div>

          <div className="w-1/2">
            <InputBasic
              label="Contract Type"
              placeholder="Permanent/Temporary"
              borderTheme
              defaultBorder
              hookProps={register('contractType')}
              error={!!errors.contractType?.message?.length}
              errorMessage={errors.contractType?.message || '&'}
            />
          </div>
        </div>
        <div className="mt-10 w-full">
          <h3 className="text-lg font-semibold mb-4">Location</h3>
          <div className="w-full h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.6943689924217!2d67.05984107556958!3d24.868558646894714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e883cc5464d%3A0xb53063e6215d35b0!2sShahrah-e-Faisal%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700748949123!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="mt-10 flex w-full flex-col gap-4">
          <div className="w-full text-ssx font-semibold text-red-500">
            {error}
          </div>
          <ButtonPrimary name="Save" loading={loading} />
          {/* <ButtonPrimary
            name="Close"
            loading={loading}
            className="h-10 rounded-lg border text-gray-600"
            type="button"
          /> */}

          <ButtonPrimary
            title="Close"
            name="Close"
            onClick={handleClose} // Navigates to Doctor Layout on click
            type="button"
          />
        </div>
      </div>

    </form >
  );
};

export default Form;

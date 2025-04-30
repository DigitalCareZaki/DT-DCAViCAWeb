'use client';

import { useSearchParams, useRouter } from 'next/navigation'; // Import useRouter
import { InputBasic, ButtonPrimary, FilePicker } from '@common';

import useForm from './useForm';

import type { ClientComponent } from '@types';



const Form: ClientComponent = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const rawType = searchParams?.get('type') || 'record';
  const type = rawType.split('?')[0];
  const patient_id = rawType.split('?patient_id=')[1];

  const [register, onSubmit, errors, loading, handleSelectFile, selectedFile] =
    useForm(type, patient_id);

  const handleClose = () => {
    router.push('/patient/emr');
  };

  console.log('selected heading >>', type)

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-fit w-1/2 flex-col gap-5 rounded-2xl bg-white p-6"
    >
      {/* <h2 className="text-xl font-bold text-center text-red-500">{type}</h2> */}


      <div className="flex w-full items-center justify-center">
        <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-red-500">
          <FilePicker
            type={selectedFile ? selectedFile?.type : 'image'}
            src={selectedFile ? URL.createObjectURL(selectedFile) : undefined}
            accept="*"
            handleFileChange={handleSelectFile}
          />
        </div>
      </div>

      {/* Message below FilePicker */}
      <p className="mt-2 text-center text-sm text-gray-500">
        Please attach PDF, JPG, PNG files.
      </p>

      <InputBasic
        title="Title of your report"
        label="Title"
        placeholder="Enter the title of your report"
        icon="SiNamecheap"
        borderTheme
        inputWrapperClassName="bg-background"
        inputClassName="bg-background"
        hookProps={register('title')}
        error={!!errors.title?.message}
        errorMessage={errors.title?.message || '&'}
      />
      <InputBasic
        title="Description"
        label="Description"
        placeholder="Enter the Description"
        icon="SiNamecheap"
        borderTheme
        inputWrapperClassName="bg-background"
        inputClassName="bg-background"
        hookProps={register('description')}
        error={!!errors.description?.message}
        errorMessage={errors.description?.message || '&'}
      />

      {/* <InputBasic
        title="Description"
        label="Description"
        placeholder="Enter the Description"
        icon="SiNamecheap"
        borderTheme
        inputWrapperClassName="bg-background"
        inputClassName="bg-background"
        hookProps={register('description')}
        error={!!errors.description?.message}
        errorMessage={errors.description?.message || '&'}
      /> */}


      {/* old code  */}
      {/* <InputBasic
        title="Family History"
        label="Family History"
        placeholder="Enter the family history"
        icon="SiNamecheap"
        borderTheme
        inputWrapperClassName="bg-background"
        inputClassName="bg-background"
        hookProps={register('familyHistory')}
        error={!!errors.familyHistory?.message}
        errorMessage={errors.familyHistory?.message || '&'}
      />
      */}
      {/* <InputBasic
        title="Start Date"
        label="Start Date"
        icon="SiNamecheap"
        borderTheme
        inputWrapperClassName="bg-background"
        inputClassName="bg-background"
        hookProps={register('startDate')}
        error={!!errors.startDate?.message}
        errorMessage={errors.startDate?.message || '&'}
      />
      <InputBasic
        title="End Date"
        label="End Date"
        placeholder="End Date"
        icon="SiNamecheap"
        borderTheme
        inputWrapperClassName="bg-background"
        inputClassName="bg-background"
        hookProps={register('endDate')}
        error={!!errors.endDate?.message}
        errorMessage={errors.endDate?.message || '&'}
      /> */}
      {/* Button Section with Save and Close */}
      <div className="flex justify-end gap-4">
        <ButtonPrimary title="Save" name="Save" loading={loading} />
        <ButtonPrimary
          title="Close"
          name="Close"
          type="button"
          onClick={handleClose}
        />
      </div>
    </form>
  );
};

export default Form;

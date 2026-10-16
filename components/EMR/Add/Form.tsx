'use client';

import { useSearchParams, useRouter } from 'next/navigation'; // Import useRouter
import { twMerge } from 'tailwind-merge';
import { FaExclamationCircle } from '@react-icons/all-files/fa/FaExclamationCircle';
import { FaInfoCircle } from '@react-icons/all-files/fa/FaInfoCircle';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';

import { InputBasic, ButtonPrimary, FilePicker } from '@common';
import { getFileExtension } from '@init-globals';

import useForm from './useForm';
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  formatFileSize,
} from './fileRules';

import type { ClientComponent } from '@types';



const Form: ClientComponent = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const rawType = searchParams?.get('type') || 'record';
  const type = rawType.split('?')[0];
  const patient_id = rawType.split('?patient_id=')[1];

  const [
    register,
    onSubmit,
    errors,
    loading,
    handleSelectFile,
    selectedFile,
    handleRemoveFile,
  ] = useForm(type, patient_id);

  const handleClose = () => {
    router.back();
  };

  const fileError = errors.file?.message;
  const isOverSizeLimit =
    !!selectedFile && selectedFile.size > MAX_FILE_SIZE_BYTES;
  const sizeUsage = selectedFile
    ? Math.min(100, (selectedFile.size / MAX_FILE_SIZE_BYTES) * 100)
    : 0;

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-fit w-1/2 flex-col gap-5 rounded-2xl bg-white p-6"
    >
      {/* <h2 className="text-xl font-bold text-center text-red-500">{type}</h2> */}


      <div className="flex w-full items-center justify-center">
        <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-red-500">
          <FilePicker
            type={selectedFile ? getFileExtension(selectedFile.name) : 'image'}
            src={selectedFile ? URL.createObjectURL(selectedFile) : undefined}
            accept={ACCEPTED_FILE_TYPES}
            handleFileChange={handleSelectFile}
          />
        </div>
      </div>

      {/* Message below FilePicker */}
      <div className="mt-2 flex w-full flex-col items-center gap-3">
        <p className="text-center text-sm text-gray-500">
          Please attach PDF, JPG, PNG files.
        </p>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-background px-3 py-1 text-xs font-medium text-gray-500">
          <FaInfoCircle className="theme-text-color" />
          Max file size:
          <span className="font-semibold text-gray-700">
            {MAX_FILE_SIZE_MB} MB
          </span>
        </span>

        {selectedFile && (
          <div
            className={twMerge(
              'flex w-full max-w-md items-center gap-3 rounded-xl border p-3',
              fileError
                ? 'border-rose-200 bg-rose-50'
                : 'border-gray-200 bg-background'
            )}
          >
            <span
              className={twMerge(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg px-1 text-[10px] font-bold uppercase text-white',
                fileError ? 'bg-rose-500' : 'theme-bg-color'
              )}
            >
              <span className="truncate">
                {getFileExtension(selectedFile.name) || 'file'}
              </span>
            </span>

            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className="truncate text-sm font-semibold text-gray-700"
                  title={selectedFile.name}
                >
                  {selectedFile.name}
                </span>
                <span
                  className={twMerge(
                    'shrink-0 text-xs font-medium',
                    isOverSizeLimit ? 'text-rose-500' : 'text-gray-500'
                  )}
                >
                  {formatFileSize(selectedFile.size)} / {MAX_FILE_SIZE_MB} MB
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className={twMerge(
                    'h-full min-w-1.5 rounded-full transition-all duration-500',
                    isOverSizeLimit ? 'bg-rose-500' : 'bg-emerald-500'
                  )}
                  style={{ width: `${sizeUsage}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              aria-label="Remove file"
              title="Remove file"
              disabled={loading}
              onClick={handleRemoveFile}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition duration-300 hover:bg-white hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {fileError && (
          <p
            role="alert"
            className="flex items-center gap-1.5 text-center text-sm font-medium text-rose-500"
          >
            <FaExclamationCircle className="shrink-0" />
            {fileError}
          </p>
        )}
      </div>

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

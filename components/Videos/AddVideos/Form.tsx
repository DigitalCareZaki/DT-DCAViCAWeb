'use client';

import useForm from './useForm';
import { useRouter } from 'next/navigation';
import { InputBasic, ButtonPrimary, DropdownSecondary } from '@common';

import type { ClientComponent } from '@types';

const Form: ClientComponent = () => {
  const [register, onSubmit, errors, loading, handleSelect, selectors] = useForm();

  const router = useRouter();

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-3xl flex-col gap-5 rounded-2xl bg-white p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
        <div className="w-full sm:w-1/2">
          <InputBasic
            title="Video title"
            label="Title"
            placeholder="Enter video title"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('title')}
            error={!!errors.title?.message?.length}
            errorMessage={errors.title?.message || '&'}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <InputBasic
            title="Video description"
            label="Description"
            placeholder="Enter video description"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('description')}
            error={!!errors.description?.message?.length}
            errorMessage={errors.description?.message || '&'}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
        <div className="w-full">
          <InputBasic
            title="Video link"
            label="Link"
            placeholder="Enter video link"
            icon="SiNamecheap"
            borderTheme
            inputWrapperClassName="bg-background"
            inputClassName="bg-background"
            hookProps={register('uri')}
            error={!!errors.uri?.message?.length}
            errorMessage={errors.uri?.message || '&'}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
        <div className="w-full sm:w-1/2">
          <DropdownSecondary
            title="Video Priority"
            label="Priority"
            borderTheme
            inputWrapperClassName="bg-background"
            error={!!errors.priority?.message}
            errorMessage={errors.priority?.message}
            selected={selectors.priority}
          >
            <>
              <div
                onClick={() => handleSelect('priority')('HIGH')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">HIGH</span>
              </div>
              <div
                onClick={() => handleSelect('priority')('LOW')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">LOW</span>
              </div>
              <div
                onClick={() => handleSelect('priority')('UNDEFINED')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">UNDEFINED</span>
              </div>
            </>
          </DropdownSecondary>
        </div>
        <div className="w-full sm:w-1/2">
          <DropdownSecondary
            title="Video Category"
            label="Category"
            borderTheme
            inputWrapperClassName="bg-background"
            error={!!errors.category?.message}
            errorMessage={errors.category?.message}
            selected={selectors.category}
          >
            <>
              <div
                onClick={() => handleSelect('category')('ECG')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">ECG</span>
              </div>
              <div
                onClick={() => handleSelect('category')('SPO2')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">SPO2</span>
              </div>
              <div
                onClick={() => handleSelect('category')('BLOODPRESSURE')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">BLOODPRESSURE</span>
              </div>
              <div
                onClick={() => handleSelect('category')('BLOODGLUCOSE')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">BLOODGLUCOSE</span>
              </div>
              <div
                onClick={() => handleSelect('category')('TEMPERATURE')}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
              >
                <span className="font-medium">TEMPERATURE</span>
              </div>
            </>
          </DropdownSecondary>
        </div>
      </div>

      <ButtonPrimary title={'Save'} name={'Save'} loading={loading} />
      <ButtonPrimary title="Close" name="Close" loading={loading} onClick={() => router.back()} />

    </form>
  );
};

export default Form;

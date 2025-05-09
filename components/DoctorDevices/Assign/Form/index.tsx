'use client';

import { useSearchParams } from 'next/navigation';

import {
  InputBasic,
  InputDropdown,
  ButtonPrimary,
  ClientGenerator,
} from '@common';

import useForm from './useForm';
import { useRouter } from 'next/navigation';
import SelectPatient from './SelectPatient';
import SelectedPatient from './SelectedPatient';

import type { ClientComponent } from '@types';

const Form: ClientComponent = () => {
  const params = useSearchParams();

  const [
    register,
    onSubmit,
    errors,
    loading,
    handleSearchPatients,
    searching,
    searchResults,
    selectedPatients,
    handleSelectPatient,
    handleRemovePatient,
  ] = useForm(params?.get('id') ?? '');

  const router = useRouter();

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-fit w-1/2 flex-col gap-5 rounded-2xl bg-white p-6"
    >
      <div className="flex w-full flex-col gap-4">
        <div className="w-full">
          <InputBasic
            label="Device"
            placeholder="Enter device id"
            borderTheme
            labelVariant="tiny"
            title="Device"
            icon="IoTimerSharp"
            defaultBorder
            hookProps={register('device_id')}
            error={!!errors.device_id?.message}
            errorMessage={errors.device_id?.message?.toString()}
            disabled={true}
          />
        </div>
        <div className="w-full">
          <InputDropdown
            loading={searching}
            label="Assign patients"
            placeholder="Assign participants by searching their email"
            title="Assign patients"
            overrideShow={0}
            hideInfo
            labelClassName="text-gray-600"
            inputClassName="bg-transparent placeholder:text-gray-600"
            icon="IoSearch"
            // onClear={onClear}
            onChange={handleSearchPatients}
            dropdownClassName="bg-gray-200"
          >
            <ClientGenerator
              data={searchResults}
              handleSelectPatient={handleSelectPatient}
            >
              <SelectPatient />
            </ClientGenerator>
          </InputDropdown>
        </div>
        <div className="flex flex-wrap gap-2">
          <ClientGenerator
            data={selectedPatients}
            handleRemovePatient={handleRemovePatient}
          >
            <SelectedPatient />
          </ClientGenerator>
        </div>
      </div>

      <ButtonPrimary title="Update" name="Update" loading={loading} />
      <ButtonPrimary type='button' title="Close" name="Close" loading={loading} onClick={() => router.back()} />

    </form>
  );
};

export default Form;

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  InputBasic,
  InputDropdown,
  ButtonPrimary,
  ClientGenerator,
} from '@common';

import useForm from './useForm';
import { useRouter } from 'next/navigation'
import SelectPatient from './SelectPatient';
import SelectedPatient from './SelectedPatient';
import { getSingleTablet } from '@service';
import type { ClientComponent } from '@types';

const Form: ClientComponent = () => {
  const params = useSearchParams();
  const [assigned, setAssigned] = useState(false);
  const tabletId = params?.get('id') ?? '';
  const router = useRouter();

  useEffect(() => {
    async function fetchDevice() {
      const res = await getSingleTablet(tabletId);
      if (res?.success) setAssigned(!!res.data.assigned);
    }
    fetchDevice();
  }, [tabletId]);


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
  ] = useForm(tabletId);

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-fit w-1/2 flex-col gap-5 rounded-2xl bg-white p-6"
    >
      <div className="flex w-full flex-col gap-4">
        <div className="w-full">
          <InputBasic
            label="Tablet"
            placeholder="Enter tablet serial"
            borderTheme
            labelVariant="tiny"
            title="Tablet"
            icon="IoTimerSharp"
            defaultBorder
            hookProps={register('tablet_id')}
            error={!!errors.serial_number?.message}
            errorMessage={errors.serial_number?.message?.toString()}
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
            disabled={selectedPatients.length > 0}
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
      <ButtonPrimary type="button" title="Close" name="Close" onClick={() => router.back()} />

    </form>
  );
};

export default Form;

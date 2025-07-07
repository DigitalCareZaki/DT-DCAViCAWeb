'use client';

import { useState, useCallback, useMemo, ChangeEvent } from 'react';
import { vestResolver } from '@hookform/resolvers/vest';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { addPatientMedication, searchOrganizationMedicine } from '@service';
import {
  showModalReducer,
  pushIntoPatientMedicationListingReducer,
} from '@slice';
import { debounce } from '@init-globals';

import { validator } from './validator';

import type {
  CreateMedicationProps,
  useFormProps,
  SelectorProps,
} from './types';
import { PatientMedicationProps, OrganizationMedicineProps } from '@types';
import type { ModalState } from '@store-types';

const useFormHook = (
  patient: string,
  handleHideForm: () => void
): any => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setResError] = useState<string | undefined>(undefined);

  const [selectors, setSelectors] = useState<SelectorProps>({
    unit: undefined,
    frequency: undefined,
  });

  const [searchingResults, setSearchingResults] = useState<
    OrganizationMedicineProps[]
  >([]);

  const _selectors = useMemo(() => selectors, [selectors]);
  const _searchingResults = useMemo(() => searchingResults, [searchingResults]);

  const [searching, setSearching] = useState<boolean>(false);

  const setMedication = (medication: PatientMedicationProps) => {
    dispatch(pushIntoPatientMedicationListingReducer({ medication }));
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<CreateMedicationProps>({
    resolver: vestResolver(validator),
  });

  const handleSelectors = useCallback(
    (type: string, value: string | number) => {
      setValue(type as any, value);
      setSelectors((prev) => ({ ...prev, [type]: value }));
    },
    [setValue]
  );

  const onChange = debounce(async (event: ChangeEvent<HTMLInputElement>[]) => {
    const value = event[0].target.value;

    try {
      setSearching(true);
      const res = await searchOrganizationMedicine(value);

      if (!res.success) return;
      setSearchingResults(res?.data ?? []);
    } catch (err: any) {
    } finally {
      setSearching(false);
    }
  }, 1000);

  const handleSetCurrentMedicineName = useCallback(
    (medicationName: string) => {
      setValue('name', medicationName);
    },
    [setValue]
  );

  const handleShowModal = (payload: ModalState) => {
    dispatch(showModalReducer(payload));
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const start = new Date(data.start);
      const end = new Date(data.end);

      // Collect time fields based on frequency
      const times: string[] = [];
      if (data.frequency >= 1 && data.time1) times.push(data.time1);
      if (data.frequency >= 2 && data.time2) times.push(data.time2);
      if (data.frequency >= 3 && data.time3) times.push(data.time3);

      // Convert times to Date objects (if needed by backend)
      const timeObjects = times.map((t) => {
        const [_hours, _minutes] = t.split(":");
        return new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          Number(_hours),
          Number(_minutes),
          0,
          0
        );
      });

      console.log('data', data);
      console.log('start', start);
      console.log('end', end);
      console.log('timeObjects', timeObjects);

      const res = await addPatientMedication(
        btoa(
          JSON.stringify({
            name: data.name,
            start_date: start,
            end_date: end,
            times: timeObjects, // send as array
            dosage: data.dosage,
            frequency: data.frequency,
            unit: data.unit,
          })
        ),
        patient
      );

      if (!res.success) {
        setResError(res?.message);

        handleShowModal({
          type: 'ERROR',
          message: res?.message ?? 'Something went wrong',
          show: true,
        });

        return;
      }

      delete res?.success;
      setMedication(res as any);

      handleHideForm.call(this);

      handleShowModal({
        type: 'SUCCESS',
        message: 'Medication added successfully',
        show: true,
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  });

  return [
    register,
    onSubmit,
    errors,
    loading,
    handleSelectors,
    _selectors,
    error,
    onChange,
    searching,
    _searchingResults,
    watch('name'),
    handleSetCurrentMedicineName,
  ];
};

export default useFormHook;

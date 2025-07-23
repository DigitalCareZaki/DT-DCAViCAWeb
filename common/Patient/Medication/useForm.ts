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

      // Ensure dates are in YYYY-MM-DD format
      const formatDate = (date: string) => {
        if (!date) return '';
        // If already in YYYY-MM-DD, return as is
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
        // Try to parse and format
        const d = new Date(date);
        if (isNaN(d.getTime())) return date;
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const start_date = formatDate(data.start); // should be YYYY-MM-DD
      const end_date = formatDate(data.end);     // should be YYYY-MM-DD

      const time = [];
      if (data.frequency >= 1 && data.time1) time.push(data.time1);
      if (data.frequency >= 2 && data.time2) time.push(data.time2);
      if (data.frequency >= 3 && data.time3) time.push(data.time3);

      console.log('data', data);
      console.log('start_date', start_date);
      console.log('end_date', end_date);
      console.log('time', time);

      const res = await addPatientMedication(
        btoa(
          JSON.stringify({
            name: data.name,
            start_date, // string
            end_date,   // string
            time,       // array of strings
            dosage: data.dosage,
            frequency: String(data.frequency), // as string if backend expects string
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

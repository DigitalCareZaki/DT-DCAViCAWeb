'use client';

import { useState } from 'react';
import { vestResolver } from '@hookform/resolvers/vest';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { addPatientMeasurement } from '@service';
import {
  showModalReducer,
  pushIntoPatientMeasurementListingReducer,
} from '@slice';

import { validator } from './validator';

import type {
  CreateMeasurementProps,
  useFormProps,
  SelectorsProps,
} from './types';
import type { PatientMeasurementProps } from '@types';
import type { ModalState } from '@store-types';

const useFormHook = (
  patient: string,
  handleHideForm: () => void
): useFormProps => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setResError] = useState<string | undefined>(undefined);

  const [selectors, setSelectors] = useState<SelectorsProps>({
    type: undefined,
    mode: 'METRIC',
    unit: undefined,
  });

  const setMeasurement = (measurement: PatientMeasurementProps) =>
    dispatch(pushIntoPatientMeasurementListingReducer({ measurement }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<CreateMeasurementProps>({
    resolver: vestResolver(validator),
  });

  const handleShowModal = (payload: ModalState) => {
    dispatch(showModalReducer(payload));
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const res = await addPatientMeasurement(
        btoa(
          JSON.stringify({
            title: data.title,
            type: data.type,
            mode: 'METRIC',
            unit: data.unit,
            reading_source: 'MANUAL',
            values: [
              parseFloat(data.value1),
              data.value2 ? parseFloat(data.value2) : null,
            ],
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
      setMeasurement(res as any);

      handleHideForm.call(this);

      handleShowModal({
        type: 'SUCCESS',
        message: 'Measurement added successfully',
        show: true,
      });
    } catch (err) {
      console.log('error at submitting the form');
    } finally {
      setLoading(false);
    }
  });

  const handleSelect = (type: string) => (val: string) => {
    setSelectors((prev) => ({ ...prev, [type]: val }));
    setValue(type as any, val);
    clearErrors(type as any);
  };

  return [register, onSubmit, errors, loading, error, handleSelect, selectors];
};

export default useFormHook;

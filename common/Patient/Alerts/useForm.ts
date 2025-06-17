'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { vestResolver } from '@hookform/resolvers/vest';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { createPatientReadingRange } from '@service';
import { showModalReducer } from '@slice';

import { validator } from './validator';

import type {
  CreatePatientReadingAlertProps,
  useFormProps,
  SelectorsProps,
} from './types';
import type { ModalState } from '@store-types';

const useFormHook = (patient: string, handleHideForm: () => void): useFormProps => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const [selectors, setSelectors] = useState<SelectorsProps>({
    type: undefined,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<CreatePatientReadingAlertProps>({
    resolver: vestResolver(validator),
  });

  // Add this
  const handleShowModal = (payload: ModalState) => {
    dispatch(showModalReducer(payload));
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const res = await createPatientReadingRange(
        btoa(
          JSON.stringify({
            patient_id: patient,
            type: data.type,
            range:
              data.type === 'BLOODPRESSURE'
                ? [
                  parseInt(data.range_low_1),
                  parseInt(data.range_high_1),
                  parseInt(data.range_low_2),
                  parseInt(data.range_high_2),
                ]
                : [parseInt(data.range_low_1), parseInt(data.range_high_1)],
            send_sms: true,
            send_email: true,
          })
        )
      );


      if (!res.success) {
        setError('Something went wrong');

        handleShowModal({
          type: 'ERROR',
          message: 'Something went wrong',
          show: true,
        });

        return;
      }

      handleHideForm.call(this);

      handleShowModal({
        type: 'SUCCESS',
        message: 'Alert added successfully',
        show: true,
      });

      router.refresh();
    } catch (err) {
      console.log('Error at submitting the form');
    } finally {
      setLoading(false);
    }
  });

  const handleSelect = (type: string, val: string) => {
    setSelectors((prev) => ({ ...prev, [type]: val }));
    setValue(type as any, val);
    clearErrors(type as any);
  };

  return [register, onSubmit, errors, loading, error, handleSelect, selectors];
};

export default useFormHook;

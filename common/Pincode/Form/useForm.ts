'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';
import { setPincode } from '@service';
import { showModalReducer } from '@slice';

import { useRouter } from 'next/navigation';

import { validator } from './validator';

import type { FormProps, UseFormHookProps } from './types';

const useFormHook: UseFormHookProps = (onClose?: () => void) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<FormProps>({
    resolver: vestResolver(validator),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const encodedData = btoa(JSON.stringify(data));

      const res = await setPincode(encodedData);

      if (res.success) {
        dispatch(
          showModalReducer({
            type: 'SUCCESS',
            message: 'Pincode set successfully, kindly login again',
            show: true,
          })
        );
        if (onClose) onClose(); // 🔴 Call it here
        return;
      }

      dispatch(
        showModalReducer({
          type: 'ERROR',
          message: res?.message ?? 'Something went wrong',
          show: true,
        })
      );
    } catch (err) {
      dispatch(
        showModalReducer({
          type: 'ERROR',
          message: 'Something went wrong',
          show: true,
        })
      );
    } finally {
      setLoading(false);
    }
  });

  return [register, onSubmit, errors, loading];
};

export default useFormHook;

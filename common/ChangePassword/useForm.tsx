'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { showModalReducer } from '@slice';

import { vestResolver } from '@hookform/resolvers/vest';

import { validator } from './validator';
import { changePassword as changePasswordService } from '@service';

import { Props, useFormProps } from './types';
import type { ModalState } from '@store-types';
import { redirect } from 'next/navigation';
const useFormHook = (): useFormProps => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<Props>({
    resolver: vestResolver(validator),
    mode: 'onChange',
  });

  const handleShowModal = (payload: ModalState) => {
    dispatch(showModalReducer(payload));
  };

  const onSubmit = handleSubmit(async () => {
    try {
      setLoading(true);

      const res = await changePasswordService(
        btoa(
          JSON.stringify({
            new_password: getValues('password'),
          })
        )
      );

      if (res?.message) {
        setError('password', {
          message: res?.message,
        });

        handleShowModal({
          type: 'ERROR',
          message: res?.message ?? 'Request failed',
          show: true,
        });

        return;
      }

      handleShowModal({
        type: 'SUCCESS',
        message: 'Password changed successfully',
        show: true,
      });

    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  });

  return [register, onSubmit, errors, loading, validator];
};

export default useFormHook;

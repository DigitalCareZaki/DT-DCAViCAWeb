'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { showModalReducer } from '@slice';

import { vestResolver } from '@hookform/resolvers/vest';

import { validator } from './validator';
import { login } from './action';

import type { LoginProps, useLoginProps } from './types';
import type { ModalState } from '@store-types';

import '@init-globals';

const useLogin = (): useLoginProps => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginProps>({
    resolver: vestResolver(validator),
    mode: 'onChange',
  });

  const handleShowModal = (payload: ModalState) => {
    dispatch(showModalReducer(payload));
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const res = await login(btoa(JSON.stringify(data)));

      if (res?.message) {
        setError('password', {
          message: res?.message,
        });

        handleShowModal({
          type: 'ERROR',
          message: res?.message ?? 'Invalid credentials',
          show: true,
        });

        return;
      }

      handleShowModal({
        type: 'SUCCESS',
        message: 'Login successful',
        show: true,
      });

      if (
        [
          'MASTER',
          'SUPERADMIN',
          'ADMIN',
          'DOCTOR',
          'NURSE',
          'PATIENT',
        ].includes(res.type)
      ) {
        router.push(`/${res.type.toLowerCase()}`);
      }
    } catch (err) {
      console.log('Error at submitting the form');
    } finally {
      setLoading(false);
    }
  });

  return [register, onSubmit, errors, loading, validator];
};

export default useLogin;

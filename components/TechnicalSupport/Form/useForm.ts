'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';

import { showModalReducer } from '@slice';
import { createTechnicalSupportQuery } from '@service';

import { validator } from './validator';

import type { UseFormProps, TechnicalSupportProps } from './types';
import type { ModalState } from '@store-types';

const useFormHook = (): UseFormProps => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm<TechnicalSupportProps>({
    resolver: vestResolver(validator),
    defaultValues: {
      forgot_password: false,
      not_signing_up: false,
      can_not_find_anything: false,
      showing_errors: false,
      others: false,
    },
  });

  const handleShowModal = (payload: ModalState) => {
    dispatch(showModalReducer(payload));
  };

  const handleClick = (name: keyof TechnicalSupportProps) => {
    if (
      ![
        'forgot_password',
        'not_signing_up',
        'can_not_find_anything',
        'showing_errors',
        'others',
      ].includes(name)
    )
      return;

    clearErrors(name);
    setValue(name, !watch(name));
  };

  const handleCancel = () => {
    router.push('/login');
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const payload = {
        forgot_password: !!data.forgot_password,
        not_signing_up: !!data.not_signing_up,
        can_not_find_anything: !!data.can_not_find_anything,
        showing_errors: !!data.showing_errors,
        others: !!data.others,
        email: data.email,
        textarea: data.textarea,
      };

      const res = await createTechnicalSupportQuery(
        btoa(JSON.stringify(payload))
      );

      if (!res.success) {
        throw new Error('Unable to create support query');
      }

      handleShowModal({
        type: 'SUCCESS',
        message: 'We will get back to you shortly',
        show: true,
      });

      router.push('/login');
    } catch (err: any) {
      handleShowModal({
        type: 'ERROR',
        message: err?.message ?? 'Something went wrong',
        show: true,
      });
    } finally {
      setLoading(false);
    }
  });

  return [
    register,
    onSubmit,
    errors,
    loading,
    watch,
    handleClick,
    handleCancel,
  ];
};

export default useFormHook;

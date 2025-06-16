'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';

import { createVideo } from '@service';
import { showModalReducer } from '@slice';

import { useUser } from '@selectors';

import { validator } from './validator';

import type { UseFormProps, CreateVideoProps, SelectorProps } from './types';
import type { ModalState } from '@store-types';

const useFormHook = (): UseFormProps => {
  const dispatch = useDispatch();

  const router = useRouter();
  const [user] = useUser();

  const [loading, setLoading] = useState<boolean>(false);

  const [selectors, setSelectors] = useState<SelectorProps>({
    priority: undefined,
    category: undefined,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<CreateVideoProps>({
    resolver: vestResolver(validator),
  });

  const handleShowModal = (payload: ModalState) => {
    dispatch(showModalReducer(payload));
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const res = await createVideo(
        btoa(
          JSON.stringify({
            title: data.title,
            description: data.description,
            uri: data.uri,
            priority: data.priority,
            category: data.category,
          })
        )
      );

      console.log('res', res);

      if (!res.success) {
        handleShowModal({
          type: 'ERROR',
          message: 'Unable to create a new video',
          show: true,
        });
        return;
      }

      handleShowModal({
        type: 'SUCCESS',
        message: `Video created successfully`,
        show: true,
      });
      router.push(`/${user.role?.toLocaleLowerCase()}/videos`);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  });

  const handleSelect = (type: string) => (val: string) => {
    setSelectors((prev) => ({ ...prev, [type]: val }));
    setValue(type as any, val);
    clearErrors(type as any);
  };

  return [register, onSubmit, errors, loading, handleSelect, selectors];
};

export default useFormHook;

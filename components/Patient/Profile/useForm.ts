'use client';
import { useEffect, useRef, useState } from 'react';
import type { BaseSyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';

import { showModalReducer, setUserReducer } from '@slice';
import { updateDoctorProfile } from '@service';
import { useUser } from '@selectors';
import { useImagePicker } from '@clienthooks';
import { uploadFile, getUser } from '@service';

import { validator } from './validator';

import type { PatientProps, UseFormProps, SelectorProps } from './types';
import type { PatientProfileData } from '@types';
import type { ModalState } from '@store-types';

const useFormHook = (data: PatientProfileData): UseFormProps => {
  const [file, handleFilePicker, selectedImage] = useImagePicker();

  const router = useRouter();
  const dispatch = useDispatch();
  const [user] = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [selectors, setSelectors] = useState<SelectorProps>({
    gender: {
      title: data?.gender,
    },
    title: {
      title: data.title,
    },
    profilePicture: data?.uri || '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<PatientProps>({
    resolver: vestResolver(validator),
  });

  const lastHydratedRef = useRef<string>('');

  const handleShowModal = (payload: ModalState) =>
    dispatch(showModalReducer(payload));

  const handleSelect = (type: string) => (title: string | undefined) => {
    setSelectors((prev) => ({ ...prev, [type]: { title } }));
    setValue(type as any, title);
    clearErrors(type as any);
  };

  const onSubmit = (e?: BaseSyntheticEvent<object, any, any>) =>
    new Promise<
      | {
          success: boolean;
          updatedData?: PatientProfileData;
        }
      | void
    >((resolve) => {
      const onValid = async (data: PatientProps) => {
        try {
          setLoading(true);

          const payload = {
            first_name: data.first_name,
            middle_name: data.middle_name,
            last_name: data.last_name,
            uri: data.uri,
            phone_number: data.phone_number,
            gender: data.gender,
            title: data.title,
            weight: data.weight,
            height: data.height,
          };

          let updatedUri = data.uri || '';

          if (file) {
            const formdata = new FormData();

            formdata.append('file', file);

            const res = await uploadFile(formdata);

            if (res.success) {
              updatedUri = res.url || '';
              Object.assign(payload, {
                uri: res.url || '',
              });
            }
          }

          console.log('payload >>>>>', payload);

          const res = await updateDoctorProfile(
            btoa(
              JSON.stringify({
                ...payload,
              })
            ),
            (user?.type?.toLowerCase() || 'patient') as string
          );

          if (res.success) {
            // Fetch the perfectly updated user payload right from the server after saving
            const freshUser = await getUser();

            // Update user data in Redux store, ensuring we enforce the newly saved values
            // like `updatedUri`, as `getUser()` might fetch a cached/stale JWT token payload
            const updatedUserData = {
              ...(freshUser || user),
              first_name: data.first_name,
              middle_name: data.middle_name,
              last_name: data.last_name,
              uri: updatedUri,
            };

            console.log('updatedUserData >>>>>', updatedUserData);

            dispatch(setUserReducer({ user: updatedUserData as any }));

            handleShowModal({
              show: true,
              type: 'SUCCESS',
              message: 'Your profile has been updated successfully',
            });

            resolve({
              success: true,
              updatedData: {
                ...data,
                uri: updatedUri,
                patient: {
                  emr: data.emr,
                  height: data.height,
                  weight: data.weight,
                },
              } as unknown as PatientProfileData,
            });

            return;
          }

          handleShowModal({
            show: true,
            type: 'ERROR',
            message: 'Cannot update profile right now',
          });
          resolve({ success: false });
        } catch (err) {
          handleShowModal({
            show: true,
            type: 'ERROR',
            message: 'OOPS Something went wrong',
          });
          resolve({ success: false });
        } finally {
          setLoading(false);
        }
      };

      const onInvalid = () => resolve(undefined);

      void handleSubmit(onValid, onInvalid)(e);
    });

  useEffect(() => {
    if (!data?.created_at) return;

    const hydrationKey = `${data?.updated_at ?? ''}-${data?.uri ?? ''}-${user?.uri ?? ''}-${user?.first_name ?? ''}-${user?.last_name ?? ''}`;
    if (lastHydratedRef.current === hydrationKey) return;
    lastHydratedRef.current = hydrationKey;

    Object.keys(data).forEach((key) => {
      if (key === 'patient') return;

      const typedKey = key as keyof PatientProfileData;
      const value = data[typedKey] as string | undefined;

      if (typeof value !== 'undefined') {
        setValue(key as any, value);
      }
    });

    if (user) {
      setValue('first_name', user.first_name ?? data.first_name ?? '');
      setValue('middle_name', user.middle_name ?? data.middle_name ?? '');
      setValue('last_name', user.last_name ?? data.last_name ?? '');
      setValue('phone_number', user.phone_number ?? data.phone_number ?? '');
      setValue('uri', user.uri ?? data.uri ?? '');
    }

    setValue('emr', data.patient.emr);
    setValue('height', data.patient.height);
    setValue('weight', data.patient.weight);
    setValue('site_name', data.patient?.site?.name ?? '');

    setSelectors((prev) => ({
      ...prev,
      gender: { title: data.gender },
      title: { title: data.title },
      profilePicture: user?.uri || data.uri || '',
    }));
  }, [data, user, setValue]);

  useEffect(() => {
    if (!selectedImage) return;

    console.log('selectedImage >>>>>', selectedImage);

    setSelectors((prev) => ({
      ...prev,
      profilePicture: selectedImage,
    }));
  }, [selectedImage]);

  return [
    register,
    onSubmit,
    errors,
    loading,
    error,
    handleSelect,
    selectors,
    handleFilePicker,
    setSelectors,
  ];
};

export default useFormHook;

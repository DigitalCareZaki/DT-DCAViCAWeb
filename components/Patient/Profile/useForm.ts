'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';

import { showModalReducer, setUserReducer } from '@slice';
import { updateDoctorProfile } from '@service';
import { useUser } from '@selectors';
import { useImagePicker } from '@clienthooks';
import { uploadFile } from '@service';

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
    // Prioritize user URI from Redux store over server data to show latest profile picture
    profilePicture: user?.uri || data.uri || '',
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

  const handleShowModal = (payload: ModalState) =>
    dispatch(showModalReducer(payload));

  const handleSelect = (type: string) => (title: string | undefined) => {
    setSelectors((prev) => ({ ...prev, [type]: { title } }));
    setValue(type as any, title);
    clearErrors(type as any);
  };

  const onSubmit = handleSubmit(async (data) => {
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

      const res = await updateDoctorProfile(
        btoa(
          JSON.stringify({
            ...payload,
          })
        ),
        (user?.type?.toLowerCase() || 'patient') as string
      );

      if (res.success) {
        // Update user data in Redux store with new profile information
        const updatedUserData = {
          ...user,
          first_name: data.first_name,
          middle_name: data.middle_name,
          last_name: data.last_name,
          uri: updatedUri,
        };

        dispatch(setUserReducer({ user: updatedUserData }));

        handleShowModal({
          show: true,
          type: 'SUCCESS',
          message: 'Your profile has been updated successfully',
        });

        // Return updated data for Form component

        setTimeout(() => {
          const userRole = user?.role?.toLowerCase() || user?.type?.toLowerCase() || 'patient';
          router.push(`/${userRole}`);
        }, 1500); // Wait 1.5 seconds to show success message before redirecting

        return {
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
        };
      } else {
        handleShowModal({
          show: true,
          type: 'ERROR',
          message: 'Cannot update profile right now',
        });
        return { success: false };
      }
    } catch (err) {
      handleShowModal({
        show: true,
        type: 'ERROR',
        message: 'OOPS Something went wrong',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (!data?.created_at) return;

    // Prefer latest values from Redux `user` (updated after profile save),
    // and fall back to the server `data` if Redux doesn't have them yet.
    Object.keys(data).forEach((key) => {
      if (key === 'patient') return;

      const typedKey = key as keyof PatientProfileData;

      // Map of fields that can come from the Redux `user` object
      const userBackedFields: Partial<Record<keyof PatientProfileData, unknown>> =
      {
        first_name: user?.first_name,
        middle_name: user?.middle_name,
        last_name: user?.last_name,
        uri: user?.uri,
        gender: user?.gender,
        title: user?.title,
      };

      const valueFromUser = userBackedFields[typedKey];
      const value =
        (valueFromUser as string | undefined) ??
        (data[typedKey] as string | undefined);

      if (typeof value !== 'undefined') {
        setValue(key as any, value);
      }
    });

    setValue('emr', data.patient.emr);
    setValue('height', data.patient.height);
    setValue('weight', data.patient.weight);
  }, [data, user]);

  useEffect(() => {
    if (!selectedImage) return;

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

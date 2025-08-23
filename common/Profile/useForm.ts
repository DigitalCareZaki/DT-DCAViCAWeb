'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { vestResolver } from '@hookform/resolvers/vest';
import { updateDoctorProfile, uploadFile } from '@service';
import { useUser } from '@selectors';
import { showModalReducer } from '@slice';

import { validator } from './validator';

import type { Props, useFormProps } from './types';
import type { DoctorProfileProps } from '@types';

const useFormHook = (data: DoctorProfileProps): useFormProps => {
  const dispatch = useDispatch();
  const [user] = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [file, setFile] = useState<File | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Props>({
    resolver: vestResolver(validator),
  });

  const handleProfilePicture = useCallback((props: File) => {
    setFile(props);
  }, []);

  useEffect(() => {
    if (!data) return;

    console.log('data >>>>>>>>>>>>>>', data);
    // setValue('speciality', data?.doctor?.specialities[0]?.title);
    setValue('title', data?.title);
    setValue('firstName', data?.first_name);
    setValue('middleName', data?.middle_name ?? '');
    setValue('lastName', data.last_name);
    setValue('branch', data?.associated_branches[0]?.name || "");
    setValue('email', data?.email);
    // setValue('npiNumber', data?.doctor?.npi_number);
    setValue('phoneNumber', data?.phone_number);
    setValue('address', data?.location?.address);
    setValue('pmdcNumber', data?.doctor?.pmdc_number);
    setValue('contractType', data?.doctor?.contract_type);
    setValue('dob', new Date(data.dob).toLocaleDateString());
    // setValue('department', data?.doctor?.departments[0]?.title);
  }, [data]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const payload = {
        title: data.title,
        first_name: data.firstName,
        middle_name: data.middleName,
        last_name: data.lastName,
        address: data.address,
        phone_number: data.phoneNumber,
      };

      if (file !== undefined) {
        const formdata = new FormData();

        formdata.append('file', file);

        const res = await uploadFile(formdata);

        if (res.success) {
          Object.assign(payload, {
            uri: res.url,
          });
        }
      }

      const res = await updateDoctorProfile(
        btoa(
          JSON.stringify({
            ...payload,
          })
        ),
        user?.type?.toLowerCase() as string
      );

      if (!res?.success) throw new Error(res?.message);

      dispatch(
        showModalReducer({
          show: true,
          message: 'Profile updated successfully',
          type: 'SUCCESS',
        })
      );
    } catch (err: any) {
      dispatch(
        showModalReducer({
          show: true,
          message: 'Phone Number Already Exists', /// ya backend sa message theak karwana han abhe demo han to kaam chala rahy hyn
          type: 'ERROR',
        })
      );
    } finally {
      setLoading(false);
    }
  });

  return [onSubmit, register, errors, loading, error, handleProfilePicture];
};

export default useFormHook;

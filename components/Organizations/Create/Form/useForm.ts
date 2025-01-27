import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import { getMasterCities, createOrganization, uploadFile } from '@service';
import { useImagePicker } from '@clienthooks';
import { showModalReducer } from '@slice';

import { validator } from './validator';

import type { FormValuesProps, UseFormProps } from './types';
import type { CitiesProps } from '@types';

const useFormHook: UseFormProps = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, handleFilePicker, uri] = useImagePicker();
  const [cities, setCities] = useState<CitiesProps[]>([]);
  const [selectedCity, setSelectedCity] = useState<CitiesProps | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm<FormValuesProps>({
    resolver: vestResolver(validator),
  });

  const handleSelectCity = useCallback(() => {
    return (name: string, id: string) => {
      clearErrors('city_id');
      setValue('city_id', id);
      setSelectedCity({ name, id });
    };
  }, [setValue, clearErrors]);

  const onSubmit = handleSubmit(async (data: FormValuesProps) => {
    try {
      setLoading(true);

      let uri: string | null = null;

      if (file) {
        const formdata = new FormData();

        formdata.append('file', file);
        const res = await uploadFile(formdata);
        uri = res?.url ?? null;
      }

      console.log(uri);

      const payload = {
        name: data.name,
        email: data.email,
        city_id: data.city_id,
        address: data.address,
        phone_number: data.phone_number,
        uri,
      };

      const res = await createOrganization(
        Buffer.from(JSON.stringify(payload)).toString('base64')
      );

      if (!res.success) {
        dispatch(
          showModalReducer({
            type: 'ERROR',
            message: res.message ?? 'Failed to create organization',
            show: true,
          })
        );

        return;
      }

      dispatch(
        showModalReducer({
          type: 'SUCCESS',
          message: 'Organization created successfully',
          show: true,
        })
      );

      router.push('/master/organizations');
    } catch (err) {
      console.log(err);
      dispatch(
        showModalReducer({
          type: 'ERROR',
          message: 'Failed to create organization',
          show: true,
        })
      );
    } finally {
      setLoading(false);
    }
  });

  const handleGetCities = async () => {
    try {
      const res = await getMasterCities();

      if (!res.success) return;

      setCities(res.data);
    } catch (err) {
      dispatch(
        showModalReducer({
          type: 'ERROR',
          message: 'Failed to get cities',
          show: true,
        })
      );
    }
  };

  useEffect(() => {
    handleGetCities();
  }, []);

  return [
    register,
    onSubmit,
    errors,
    loading,
    handleFilePicker,
    uri,
    cities,
    selectedCity,
    handleSelectCity,
  ];
};

export default useFormHook;

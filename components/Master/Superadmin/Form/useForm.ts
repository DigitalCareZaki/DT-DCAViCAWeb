'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';

import {
  getCountries,
  getCities,
  getSelectOrganization,
  addSuperAdmin,
} from '@service';
import { showModalReducer } from '@slice';

import { validator } from './validator';

import type { AddSuperAdminProps, useFormProps, SelectorsProps } from './types';
import type {
  SelectOrganizationBranches,
  CountriesProps,
  CitiesProps,
} from '@types';

import { ModalState } from '@store-types';

const useFormHook = (): useFormProps => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [selectors, setSelectors] = useState<SelectorsProps>({
    gender: {
      title: undefined,
      id: undefined,
    },
    title: {
      title: undefined,
      id: undefined,
    },
    organization: {
      title: undefined,
      id: undefined,
    },
    country: {
      title: undefined,
      id: undefined,
    },
    city: {
      title: undefined,
      id: undefined,
    },
  });

  const [organizations, setOrganizations] = useState<{
    loading: boolean;
    data: SelectOrganizationBranches[];
  }>({
    loading: false,
    data: [],
  });

  const [countries, setCountries] = useState<{
    loading: boolean;
    data: CountriesProps[];
  }>({
    loading: false,
    data: [],
  });

  const [cities, setCities] = useState<{
    loading: boolean;
    data: CitiesProps[];
  }>({
    loading: false,
    data: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<AddSuperAdminProps>({
    resolver: vestResolver(validator),
  });

  const handleShowModal = (payload: ModalState) =>
    dispatch(showModalReducer(payload));

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const res = await addSuperAdmin(
        btoa(
          JSON.stringify({
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
            middle_name: data.middleName,
            username: data.username,
            phone_number: data.phoneNumber,
            gender: data.gender,
            title: data.title,
            password: data.password,
            organization_id: data.organization,
            city_id: data.city,
            country_id: data.country,
            dob: new Date(data.dob).toISOString(),
            address: data.address,
          })
        )
      );

      if (!res.success) {
        handleShowModal({ message: res?.message, type: 'ERROR', show: true });
        return;
      }

      handleShowModal({
        message: 'Admin Added',
        type: 'SUCCESS',
        show: true,
      });

      router.push('/');
    } catch (err: any) {
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  });

  const handleSelect =
    (type: string) => (title: string | undefined, id: string | undefined) => {
      if (type === 'branch') {
        setSelectors((prev) => ({ ...prev, ['organization']: { title, id } }));
        setValue('organization', id || (title as any));
        clearErrors('organization');

        return;
      }
      setSelectors((prev) => ({ ...prev, [type]: { title, id } }));
      setValue(type as any, id || title);
      clearErrors(type as any);
    };

  useEffect(() => {
    try {
      (async () => {
        setOrganizations({
          loading: false,
          data: [],
        });
        const res = await getSelectOrganization();
        setOrganizations({
          loading: false,
          data: res.data,
        });
      })();

      (async () => {
        setCities({
          loading: true,
          data: [],
        });

        const res = await getCities();

        setCities({
          loading: false,
          data: res.data,
        });
      })();

      (async () => {
        setCountries({
          loading: true,
          data: [],
        });

        const res = await getCountries();

        setCountries({
          loading: false,
          data: res.data,
        });
      })();
    } catch (err) {}
  }, []);

  return [
    register,
    onSubmit,
    errors,
    loading,
    error,
    handleSelect,
    selectors,
    organizations,
    cities,
    countries,
  ];
};

export default useFormHook;

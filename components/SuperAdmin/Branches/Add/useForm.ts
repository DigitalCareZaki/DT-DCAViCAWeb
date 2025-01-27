'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';

import { addSuperAdminBranch, getCountries, getCities } from '@service';
import { showModalReducer } from '@slice';

import validator from './validator';

import type { AddBranchProps, useFormHookProps, SelectorsProps } from './types';
import type { CountriesProps, CitiesProps } from '@types';

import type { ModalState } from '@store-types';

const useFormHook = (): useFormHookProps => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const [selectors, setSelectors] = useState<SelectorsProps>({
    country: {
      title: undefined,
      id: undefined,
    },
    city: {
      title: undefined,
      id: undefined,
    },
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

  const handleShowModal = (props: ModalState) =>
    dispatch(showModalReducer(props));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<AddBranchProps>({
    resolver: vestResolver(validator),
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    router.prefetch('/superadmin/branches');

    const res = await addSuperAdminBranch(btoa(JSON.stringify(data)));

    if (!res.success) {
      handleShowModal({
        show: true,
        type: 'ERROR',
        message: res.message ?? 'Something went wrong',
      });

      setLoading(false);
      return;
    }

    handleShowModal({
      show: true,
      type: 'SUCCESS',
      message: 'Branch added successfully',
    });

    router.push('/superadmin/branches');

    setLoading(false);
  });

  const handleSelect =
    (type: string) => (title: string | undefined, id: string | undefined) => {
      setSelectors((prev) => ({ ...prev, [type]: { title, id } }));
      setValue(type as any, id);
      clearErrors(type as any);
    };

  useEffect(() => {
    (async () => {
      setCountries({
        loading: true,
        data: [],
      });
      const res = await getCountries();
      setCountries({
        loading: false,
        data: res.success ? res.data : [],
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
        data: res.success ? res.data : [],
      });
    })();
  }, []);

  useEffect(() => {
    if (!selectors.country.id) return;

    (async () => {
      setCities({
        loading: true,
        data: [],
      });

      const res = await getCities();

      setCities({
        loading: false,
        data: res.success ? res.data : [],
      });
    })();

    return () => {};
  }, [selectors.country.id]);

  return [
    register,
    onSubmit,
    errors,
    loading,
    handleSelect,
    selectors,
    countries,
    cities,
  ];
};

export default useFormHook;

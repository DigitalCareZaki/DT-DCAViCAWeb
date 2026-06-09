'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import {
  getDepartmentBranches,
  getDepartmentCities,
  createDepartment,
} from '@service';
import { showModalReducer } from '@slice';
import { useUser } from '@selectors';

import { validator } from './validator';

import type {
  DepartmentProps,
  UseFormProps,
  ValuesProps,
  SelectedValuesProps,
} from './types';

const useFormHook = (): UseFormProps => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user] = useUser();

  const [branches, setBranches] = useState<ValuesProps[]>([]);
  const [cities, setCities] = useState<ValuesProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedValues, setSelectedValues] = useState<SelectedValuesProps>({
    branch: {
      name: undefined,
      id: undefined,
    },
    city: {
      name: undefined,
      id: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<DepartmentProps>({
    resolver: vestResolver(validator),
  });

  const handleSelect = (type: string) => (props: ValuesProps) => {
    if (type === 'branch') {
      setValue('branch_id', props.id);
      clearErrors('branch_id');
    }

    if (type === 'city') {
      setValue('city', props.id);
      clearErrors('city');
    }

    setSelectedValues((prev) => ({
      ...prev,
      [type]: {
        id: props.id,
        name: props.name,
      },
    }));
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const payload = {
        title: data.title,
        city_id: data.city,
        branch_id: data.branch_id,
        description: data.description,
        address: data.address,
        zipcode: data.zipcode,
      };

      // btoa;
      const res = await createDepartment(btoa(JSON.stringify(payload)));

      if (!res.success) {
        dispatch(
          showModalReducer({
            type: 'ERROR',
            message: res.message,
            show: true,
          })
        );
        return;
      }

      dispatch(
        showModalReducer({
          type: 'SUCCESS',
          message: 'Department Created Successfully',
          show: true,
        })
      );

      router.push(`/${user.role?.toLocaleLowerCase()}/departments`);
    } catch (err: any) {
      dispatch(
        showModalReducer({
          type: 'ERROR',
          message: err?.message,
          show: true,
        })
      );
    } finally {
      setLoading(false);
    }
  });

  const handleFetchAndSetBranches = useCallback(async () => {
    try {
      const res = await getDepartmentBranches();

      if (!res.success) return;

      setBranches(res.data);
    } catch (err) { }
  }, []);

  const handleFetchAndSetCities = useCallback(async () => {
    try {
      const res = await getDepartmentCities();

      if (!res.success) return;

      setCities(res.data);
    } catch (err) { }
  }, []);

  useEffect(() => {
    handleFetchAndSetBranches();
    handleFetchAndSetCities();
  }, []);

  return [
    register,
    onSubmit,
    errors,
    loading,
    branches,
    selectedValues,
    handleSelect,
    cities,
  ];
};

export default useFormHook;

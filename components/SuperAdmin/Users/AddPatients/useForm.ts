'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';

import {
  getOrganizationBranchesSelect,
  getCountries,
  getCities,
  addPatient,
  getOrganizationDoctors,
  getOrganizationNurses,
} from '@service';
import { showModalReducer } from '@slice';

import { useUser } from '@selectors';

import { validator } from './validator';

import type { AddPatientProps, useFormProps, SelectorsProps } from './types';
import type {
  SelectOrganizationBranches,
  CountriesProps,
  CitiesProps,
  SelectUserProps,
} from '@types';

import { ModalState } from '@store-types';

const useFormHook = (): useFormProps => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [user] = useUser();

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
    branch: {
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
    nurse: {
      title: undefined,
      id: undefined,
    },
    doctor: {
      title: undefined,
      id: undefined,
    },
  });

  const [branches, setBranches] = useState<{
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

  const [doctors, setDoctors] = useState<{
    loading: boolean;
    data: SelectUserProps[];
  }>({
    loading: false,
    data: [],
  });

  const [nurses, setNurses] = useState<{
    loading: boolean;
    data: SelectUserProps[];
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
  } = useForm<AddPatientProps>({
    resolver: vestResolver(validator),
    mode: 'onChange',
  });

  const handleShowModal = (payload: ModalState) =>
    dispatch(showModalReducer(payload));

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const res = await addPatient(
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
            branch_id: data.branch,
            city_id: data.city,
            country_id: data.country,
            weight: data.weight ? parseFloat(data.weight) : null,
            height: data.height ? parseFloat(data.height) : null,
            dob: new Date(data.dob).toISOString(),
            address: data.address,
            doctor_id: data.doctor,
            nurse_id: data.nurse,
          })
        )
      );

      if (!res.success) {
        handleShowModal({ message: res?.message, type: 'ERROR', show: true });
        return;
      }

      handleShowModal({
        message: 'Patient added',
        type: 'SUCCESS',
        show: true,
      });

      router.push(`/${user.role?.toLocaleLowerCase()}/users`);
    } catch (err: any) {
      setError(err?.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  });

  const handleSelect =
    (type: string) => (title: string | undefined, id: string | undefined) => {
      setSelectors((prev) => ({ ...prev, [type]: { title, id } }));
      setValue(type as any, id || title);
      clearErrors(type as any);
    };

  useEffect(() => {
    (async () => {
      setBranches({
        loading: true,
        data: [],
      });
      const res = await getOrganizationBranchesSelect();
      setBranches({
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

    (async () => {
      setDoctors({
        loading: false,
        data: [],
      });

      const res = await getOrganizationDoctors();

      setDoctors({
        loading: true,
        data: res.data,
      });
    })();

    (async () => {
      setNurses({
        loading: false,
        data: [],
      });

      const res = await getOrganizationNurses();

      setNurses({
        loading: true,
        data: res.data,
      });
    })();
  }, []);

  return [
    register,
    onSubmit,
    errors,
    loading,
    error,
    handleSelect,
    selectors,
    branches,
    cities,
    countries,
    doctors,
    nurses,
    validator,
  ];
};

export default useFormHook;

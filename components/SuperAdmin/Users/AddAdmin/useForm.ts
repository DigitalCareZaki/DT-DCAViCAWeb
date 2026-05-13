'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';

import {
  getOrganizationBranchesSelect,
  getCountries,
  getCities,
  addAdmin,
  checkUsername,
} from '@service';

import { useUser } from '@selectors';

import { showModalReducer } from '@slice';

import { validator } from './validator';
import {
  formatPhoneNumberToE164,
  getInternationalPhoneNumberError,
  normalizePhoneNumberInput,
} from '../../../../utils/phoneNumber';

import type { AddAdminProps, useFormProps, SelectorsProps, UsernameStatus } from './types';
import type {
  SelectOrganizationBranches,
  CountriesProps,
  CitiesProps,
} from '@types';

import { ModalState } from '@store-types';

const useFormHook = (): useFormProps => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [user] = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>('idle');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    setError: setFieldError,
  } = useForm<AddAdminProps>({
    resolver: vestResolver(validator),
    mode: 'onChange',
  });

  const handleShowModal = (payload: ModalState) =>
    dispatch(showModalReducer(payload));

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const res = await addAdmin(
        btoa(
          JSON.stringify({
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
            middle_name: data.middleName,
            username: data.username,
            phone_number: formatPhoneNumberToE164(data.phoneNumber),
            gender: data.gender,
            title: data.title,
            password: data.password,
            branch_id: data.branch,
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

  const handleUsernameChange = useCallback((username: string) => {
    if (!username || username.trim().length < 3) {
      setUsernameStatus('idle');
      if (debounceRef.current) clearTimeout(debounceRef.current);
      return;
    }

    setUsernameStatus('checking');

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await checkUsername(username.trim());
        if (res.success) {
          setUsernameStatus(res.exists ? 'exists' : 'available');
        } else {
          setUsernameStatus('idle');
        }
      } catch {
        setUsernameStatus('idle');
      }
    }, 600);
  }, []);

  const handlePhoneNumberChange = useCallback((phoneNumber: string) => {
    const normalizedPhoneNumber = normalizePhoneNumberInput(phoneNumber);
    setValue('phoneNumber', normalizedPhoneNumber, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    const phoneError = getInternationalPhoneNumberError(normalizedPhoneNumber);

    if (phoneError) {
      setFieldError('phoneNumber', {
        type: 'validate',
        message: phoneError,
      });
      return;
    }

    clearErrors('phoneNumber');
  }, [clearErrors, setFieldError, setValue]);

  const setDobValue = (value: Date | undefined | null) => {
    const iso = value ? new Date(value).toISOString() : '';
    setValue('dob', iso as any, { shouldValidate: true });
    clearErrors('dob');
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
    setDobValue,
    validator,
    usernameStatus,
    handleUsernameChange,
    handlePhoneNumberChange,
  ];
};

export default useFormHook;

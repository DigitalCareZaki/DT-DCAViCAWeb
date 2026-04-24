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
  addNurse,
  getOrganizationDepartments,
  getSites,
  checkUsername,
} from '@service';
import { showModalReducer } from '@slice';

import { useUser } from '@selectors';

import { validator } from './validator';

import type { AddNurseProps, useFormProps, SelectorsProps, UsernameStatus } from './types';
import type {
  SelectOrganizationBranches,
  CountriesProps,
  CitiesProps,
  SelectOrganizationDepartments,
  SiteProps,
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
    department: {
      title: undefined,
      id: undefined,
    },
    avicardia_monitoring: {
      title: undefined,
      id: undefined,
    },
    site: {
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

  const [departments, setDepartments] = useState<{
    loading: boolean;
    data: SelectOrganizationDepartments[];
  }>({
    loading: false,
    data: [],
  });

  const [sites, setSites] = useState<{
    loading: boolean;
    data: SiteProps[];
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
  } = useForm<AddNurseProps>({
    resolver: vestResolver(validator),
    mode: 'onChange',
  });

  const handleShowModal = (payload: ModalState) =>
    dispatch(showModalReducer(payload));

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const res = await addNurse(
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
            npi_number: data.npi_number,
            employee_id: data.employee_id,
            department_id: data.department,
            site_id: selectors.site.id,
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
        message: 'Nurse added',
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

    (async () => {
      setSites({
        loading: true,
        data: [],
      });

      const res = await getSites(1, 1000);

      if (res.success && res.data) {
        setSites({
          loading: false,
          data: res.data.data,
        });
      } else {
        setSites({
          loading: false,
          data: [],
        });
      }
    })();

    (async () => {
      setDepartments({
        loading: true,
        data: [],
      });

      const res = await getOrganizationDepartments(
        selectors.branch.id as string
      );

      setDepartments({
        loading: false,
        data: res.data,
      });
    })();
  }, []);

  useEffect(() => {
    if (!selectors.branch.id) return;

    (async () => {
      setDepartments({
        loading: true,
        data: [],
      });

      const res = await getOrganizationDepartments(
        selectors.branch.id as string
      );

      setDepartments({
        loading: false,
        data: res.data,
      });
    })();

    return () => { };
  }, [selectors.branch.id]);

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
    departments,
    sites,
    setDobValue,
    validator,
    usernameStatus,
    handleUsernameChange,
  ];
};

export default useFormHook;

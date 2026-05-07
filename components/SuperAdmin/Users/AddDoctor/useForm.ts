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
  addDoctor,
  getOrganizationDepartments,
  getSites,
  checkUsername,
} from '@service';
import { showModalReducer } from '@slice';

import { useUser } from '@selectors';

import { validator } from './validator';

import type { AddDoctorProps, useFormProps, SelectorsProps, LoadingStep, LoadingStepInfo, UsernameStatus } from './types';
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
  const [currentStep, setCurrentStep] = useState<LoadingStep>('idle');
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
    site: {
      title: undefined,
      id: undefined,
    },
    avicardia_monitoring: {
      title: undefined,
      id: undefined,
    },
  });

  const [sites, setSites] = useState<{
    loading: boolean;
    data: SiteProps[];
  }>({
    loading: false,
    data: [],
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm<AddDoctorProps>({
    defaultValues: {
      phoneNumber: '+92',
    },
    resolver: vestResolver(validator),
    mode: 'onChange',
  });

  const handleShowModal = (payload: ModalState) =>
    dispatch(showModalReducer(payload));

  // Function to get loading step information
  const getLoadingStepInfo = (step: LoadingStep): LoadingStepInfo => {
    const steps: Record<LoadingStep, LoadingStepInfo> = {
      idle: {
        step: 'idle',
        title: 'Ready to Submit',
        description: 'Form is ready for submission',
        progress: 0,
      },
      validating: {
        step: 'validating',
        title: 'Validating Form',
        description: 'Checking form data and requirements...',
        progress: 20,
      },
      preparing: {
        step: 'preparing',
        title: 'Preparing Data',
        description: 'Organizing doctor information...',
        progress: 40,
      },
      submitting: {
        step: 'submitting',
        title: 'Submitting to Server',
        description: 'Sending doctor data to the server...',
        progress: 60,
      },
      processing: {
        step: 'processing',
        title: 'Processing Request',
        description: 'Server is processing the doctor creation...',
        progress: 70,
      },
      syncing: {
        step: 'syncing',
        title: 'Syncing with Vivalink...',
        description: 'Synchronizing doctor data with Vivalink monitoring system...',
        progress: 85,
      },
      success: {
        step: 'success',
        title: 'Doctor Created Successfully!',
        description: 'Redirecting to users page...',
        progress: 100,
      },
      error: {
        step: 'error',
        title: 'Error Occurred',
        description: 'Something went wrong. Please try again.',
        progress: 0,
      },
    };
    return steps[step];
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      setError('');
      setCurrentStep('validating');

      // Simulate validation step
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentStep('preparing');

      // Simulate data preparation step
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentStep('submitting');

      const res = await addDoctor(
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
            department_id: selectors.department.id,
            dob: new Date(data.dob).toISOString(),
            address: data.address,
            pmdc_number: data.pmdc_number,
            site_id: selectors.site.id,
            avicardia_monitoring: selectors.avicardia_monitoring.title,
          })
        )
      );

      setCurrentStep('processing');
      // Simulate processing step
      await new Promise(resolve => setTimeout(resolve, 400));

      if (!res.success) {
        setCurrentStep('error');
        handleShowModal({ message: res?.message, type: 'ERROR', show: true });
        return;
      }

      // If YES is selected, show the syncing step briefly
      if (selectors.avicardia_monitoring.title === 'YES') {
        setCurrentStep('syncing');
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setCurrentStep('success');

      handleShowModal({
        message: 'Doctor added',
        type: 'SUCCESS',
        show: true,
      });

      // Wait 3 seconds before redirecting to show success step
      setTimeout(() => {
        router.push(`/${user.role?.toLocaleLowerCase()}/users`);
      }, 3000);

    } catch (err: any) {
      setCurrentStep('error');
      setError(err?.message ?? 'Something went wrong');
      handleShowModal({ message: err?.message, type: 'ERROR', show: true });
    } finally {
      if (!loading) { // logic check: if we are here and not step=success/error? 
        // We generally keep loading true until redirect or error display.
      }

      setLoading(false);
    }
  });

  const handleSelect =
    (type: string) => (title: string | undefined, id: string | undefined) => {
      setSelectors((prev) => {
        const updated = { ...prev, [type]: { title, id } };

        if (type === 'branch') {
          updated.department = { title: undefined, id: undefined };
          updated.site = { title: undefined, id: undefined };
          setValue('department', '');
          setValue('site', '');
        }

        return updated;
      });
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

  }, []);

  useEffect(() => {
    if (!selectors.branch.id) {
      setSites({
        loading: false,
        data: [],
      });
      return;
    }

    (async () => {
      setSites({
        loading: true,
        data: [],
      });

      try {
        const res = await getSites(1, 1000, selectors.branch.id);

        setSites({
          loading: false,
          data: res.success && res.data ? res.data.data : [],
        });
      } catch (error) {
        setSites({
          loading: false,
          data: [],
        });
      }
    })();
  }, [selectors.branch.id]);

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
  }, [selectors.branch]);

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
    currentStep,
    getLoadingStepInfo,
    usernameStatus,
    handleUsernameChange,
  ];
};

export default useFormHook;

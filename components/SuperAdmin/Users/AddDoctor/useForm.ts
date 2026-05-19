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
  checkDoctorUnique,
} from '@service';
import { showModalReducer } from '@slice';

import { useUser } from '@selectors';

import { validator } from './validator';
import {
  formatPhoneNumberToE164,
  getInternationalPhoneNumberError,
  normalizePhoneNumberInput,
} from '../../../../utils/phoneNumber';

import type {
  AddDoctorProps,
  useFormProps,
  SelectorsProps,
  LoadingStep,
  LoadingStepInfo,
  UsernameStatus,
  DoctorUniqueErrors,
  DoctorUniqueChecking,
  DoctorUniqueFormField,
} from './types';
import type {
  CheckDoctorUniqueParams,
  DoctorUniqueField,
} from '../../../../service/superadmin/checkDoctorUnique';
import type {
  SelectOrganizationBranches,
  CountriesProps,
  CitiesProps,
  SelectOrganizationDepartments,
  SiteProps,
} from '@types';

import { ModalState } from '@store-types';

const emptyUniqueErrors: DoctorUniqueErrors = {
  email: '',
  phoneNumber: '',
  npi_number: '',
  pmdc_number: '',
};

const emptyUniqueExists: Record<DoctorUniqueFormField, boolean> = {
  email: false,
  phoneNumber: false,
  npi_number: false,
  pmdc_number: false,
};

const emptyUniqueChecking: DoctorUniqueChecking = {
  email: false,
  phoneNumber: false,
  npi_number: false,
  pmdc_number: false,
};

const formFieldByApiField: Record<DoctorUniqueField, DoctorUniqueFormField> = {
  email: 'email',
  phone_number: 'phoneNumber',
  npi_number: 'npi_number',
  pmdc_number: 'pmdc_number',
};

const fallbackUniqueMessages: DoctorUniqueErrors = {
  email: 'Email already exists',
  phoneNumber: 'Phone number already exists',
  npi_number: 'NPI number already exists',
  pmdc_number: 'PMDC number already exists',
};

const useFormHook = (): useFormProps => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [user] = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<LoadingStep>('idle');
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>('idle');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uniqueDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uniqueCheckRequestIdRef = useRef<number>(0);
  const [uniqueErrors, setUniqueErrors] =
    useState<DoctorUniqueErrors>(emptyUniqueErrors);
  const [uniqueExists, setUniqueExists] =
    useState<Record<DoctorUniqueFormField, boolean>>(emptyUniqueExists);
  const [uniqueChecking, setUniqueChecking] =
    useState<DoctorUniqueChecking>(emptyUniqueChecking);

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
    setError: setFieldError,
    reset,
    getValues,
  } = useForm<AddDoctorProps>({
    defaultValues: {
      phoneNumber: '+92',
    },
    resolver: vestResolver(validator),
    mode: 'onChange',
  });

  const handleShowModal = (payload: ModalState) =>
    dispatch(showModalReducer(payload));

  const getUniqueCheckParams = useCallback((): CheckDoctorUniqueParams => {
    const values = getValues();
    const normalizedPhoneNumber = normalizePhoneNumberInput(
      values.phoneNumber || ''
    );
    const phoneNumber = getInternationalPhoneNumberError(normalizedPhoneNumber)
      ? ''
      : formatPhoneNumberToE164(normalizedPhoneNumber);
    const params: CheckDoctorUniqueParams = {};

    if (values.email?.trim()) params.email = values.email.trim();
    if (phoneNumber?.trim()) params.phone_number = phoneNumber.trim();
    if (values.npi_number?.trim()) {
      params.npi_number = values.npi_number.trim();
    }
    if (values.pmdc_number?.trim()) {
      params.pmdc_number = values.pmdc_number.trim();
    }

    return params;
  }, [getValues]);

  const clearUniqueField = useCallback((field: DoctorUniqueFormField) => {
    setUniqueErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
    setUniqueExists((prev) => ({
      ...prev,
      [field]: false,
    }));
  }, []);

  const checkDoctorUniqueValues = useCallback(async (
    activeField?: DoctorUniqueFormField
  ) => {
    const params = getUniqueCheckParams();

    if (!Object.values(params).some((value) => value?.trim())) {
      setUniqueErrors(emptyUniqueErrors);
      setUniqueExists(emptyUniqueExists);
      setUniqueChecking(emptyUniqueChecking);
      return false;
    }

    const requestId = uniqueCheckRequestIdRef.current + 1;
    uniqueCheckRequestIdRef.current = requestId;
    setUniqueChecking(
      activeField
        ? {
          ...emptyUniqueChecking,
          [activeField]: true,
        }
        : emptyUniqueChecking
    );

    try {
      const res = await checkDoctorUnique(params);

      if (uniqueCheckRequestIdRef.current !== requestId) {
        return false;
      }

      if (!res.success) {
        return false;
      }

      const hasConflict = Object.values(res.fields).some(
        (result) => result.checked && result.exists
      );

      setUniqueErrors((prev) => {
        const next = { ...prev };

        Object.entries(res.fields).forEach(([apiField, result]) => {
          const formField =
            formFieldByApiField[apiField as DoctorUniqueField];

          if (!formField || !result.checked) return;

          next[formField] = result.exists
            ? result.message || fallbackUniqueMessages[formField]
            : '';
        });

        return next;
      });

      setUniqueExists((prev) => {
        const next = { ...prev };

        Object.entries(res.fields).forEach(([apiField, result]) => {
          const formField =
            formFieldByApiField[apiField as DoctorUniqueField];

          if (!formField || !result.checked) return;

          next[formField] = result.exists;
        });

        return next;
      });

      return hasConflict;
    } catch {
      return false;
    } finally {
      if (uniqueCheckRequestIdRef.current === requestId) {
        setUniqueChecking(emptyUniqueChecking);
      }
    }
  }, [getUniqueCheckParams]);

  const scheduleUniqueCheck = useCallback((field: DoctorUniqueFormField) => {
    if (uniqueDebounceRef.current) clearTimeout(uniqueDebounceRef.current);

    uniqueDebounceRef.current = setTimeout(() => {
      checkDoctorUniqueValues(field);
    }, 500);
  }, [checkDoctorUniqueValues]);

  const handleUniqueFieldChange = useCallback(
    (field: DoctorUniqueFormField, value: string) => {
      uniqueCheckRequestIdRef.current += 1;

      const cleanValue =
        field === 'phoneNumber'
          ? normalizePhoneNumberInput(value)
          : value.trim();
      const shouldClear =
        !cleanValue ||
        (field === 'phoneNumber' &&
          !!getInternationalPhoneNumberError(cleanValue));

      if (shouldClear) {
        clearUniqueField(field);
      }

      scheduleUniqueCheck(field);
    },
    [clearUniqueField, scheduleUniqueCheck]
  );

  const handleUniqueFieldBlur = useCallback(
    (field: DoctorUniqueFormField, value: string) => {
      handleUniqueFieldChange(field, value);
    },
    [handleUniqueFieldChange]
  );

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
      const hasDuplicateDoctorField = await checkDoctorUniqueValues();

      if (hasDuplicateDoctorField) {
        setCurrentStep('error');
        handleShowModal({
          message: 'Please resolve duplicate doctor fields before submitting',
          type: 'ERROR',
          show: true,
        });
        return;
      }

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
            phone_number: formatPhoneNumberToE164(data.phoneNumber),
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

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (uniqueDebounceRef.current) clearTimeout(uniqueDebounceRef.current);
    };
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
    handlePhoneNumberChange,
    uniqueErrors,
    uniqueChecking,
    Object.values(uniqueExists).some(Boolean),
    handleUniqueFieldChange,
    handleUniqueFieldBlur,
  ];
};

export default useFormHook;

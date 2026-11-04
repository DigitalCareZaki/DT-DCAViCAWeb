'use client';

import { useEffect, useState, useCallback } from 'react';
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
  getSites,
  getSiteDoctors,
  getPatientProtocols,
} from '@service';
import { showModalReducer } from '@slice';

import { useUser } from '@selectors';

import { validator } from './validator';
import useUniqueUserCheck from '../useUniqueUserCheck';
import {
  formatPhoneNumberToE164,
  getInternationalPhoneNumberError,
  normalizePhoneNumberInput,
} from '../../../../utils/phoneNumber';

import type { AddPatientProps, useFormProps, SelectorsProps, UsernameStatus } from './types';
import type { UserUniqueFormField } from '../useUniqueUserCheck';
import type { MonitoringProtocol } from '@types-services';
import type {
  SelectOrganizationBranches,
  CountriesProps,
  CitiesProps,
  SelectUserProps,
  SiteProps,
} from '@types';

import { ModalState } from '@store-types';

const patientUniqueFields: UserUniqueFormField[] = [
  'email',
  'phoneNumber',
  'username',
];

// Define loading step types
export type LoadingStep =
  | 'idle'
  | 'validating'
  | 'preparing'
  | 'submitting'
  | 'processing'
  | 'syncing'
  | 'success'
  | 'error';

export interface LoadingStepInfo {
  step: LoadingStep;
  title: string;
  description: string;
  progress: number;
}

const useFormHook = (): useFormProps => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [user] = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<LoadingStep>('idle');
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>('idle');

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
    site: {
      title: undefined,
      id: undefined,
    },
    doctor: {
      title: undefined,
      id: undefined,
    },
    cardiac_monitoring: {
      title: undefined,
      id: undefined,
    },
    monitring_protocol_id: {
      title: undefined,
      id: undefined,
    },
  });

  const [protocols, setProtocols] = useState<{
    loading: boolean;
    data: MonitoringProtocol[];
    error: string;
  }>({ loading: true, data: [], error: '' });

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

  const [sites, setSites] = useState<{
    loading: boolean;
    data: SiteProps[];
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
    setError: setFieldError,
    getValues,
  } = useForm<AddPatientProps>({
    resolver: vestResolver(validator),
    mode: 'onChange',
  });

  const handleShowModal = (payload: ModalState) =>
    dispatch(showModalReducer(payload));

  const {
    uniqueErrors,
    uniqueChecking,
    hasUniqueConflict,
    checkUniqueValues,
    handleUniqueFieldChange,
  } = useUniqueUserCheck<AddPatientProps>({
    role: 'PATIENT',
    fields: patientUniqueFields,
    getValues,
  });

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
        description: 'Organizing patient information...',
        progress: 40,
      },
      submitting: {
        step: 'submitting',
        title: 'Submitting to Server',
        description: 'Sending patient data to the server...',
        progress: 60,
      },
      processing: {
        step: 'processing',
        title: 'Processing Request',
        description: 'Server is processing the patient creation...',
        progress: 70,
      },
      syncing: {
        step: 'syncing',
        title: 'Syncing with Vivalink...',
        description: 'Synchronizing patient data with Vivalink monitoring system...',
        progress: 85,
      },
      success: {
        step: 'success',
        title: 'Patient Created Successfully!',
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
      const hasDuplicateUserField = await checkUniqueValues();

      if (hasDuplicateUserField) {
        setCurrentStep('error');
        handleShowModal({
          message: 'Please resolve duplicate fields before submitting',
          type: 'ERROR',
          show: true,
        });
        return;
      }

      setCurrentStep('preparing');

      // Get current form values to ensure we have the latest state
      const currentValues = getValues();
      const phoneNumber = formatPhoneNumberToE164(currentValues.phoneNumber);

      // Use selector values for proper data mapping
      const payload = {
        email: currentValues.email,
        first_name: currentValues.firstName,
        last_name: currentValues.lastName,
        middle_name: currentValues.middleName,
        username: currentValues.username,
        phone_number: phoneNumber,
        gender: selectors.gender.title, // Use selector title instead of form value
        title: selectors.title.title, // Use selector title instead of form value
        password: currentValues.password,
        branch_id: selectors.branch.id, // Use selector id for proper mapping
        city_id: selectors.city.id, // Use selector id for proper mapping
        country_id: selectors.country.id, // Use selector id for proper mapping
        weight: currentValues.weight ? parseFloat(currentValues.weight) : null,
        height: currentValues.height ? parseFloat(currentValues.height) : null,
        dob: new Date(currentValues.dob).toISOString(),
        address: currentValues.address,
        site_id: selectors.site.id, // Use selector id for proper mapping
        doctor_id: selectors.doctor.id, // Use selector id for proper mapping
        nurse_id: selectors.nurse.id, // Use selector id for proper mapping
        cardiac_monitoring: selectors.cardiac_monitoring.title,
        monitring_protocol_id: selectors.monitring_protocol_id.id,
      };


      // Simulate data preparation step
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentStep('submitting');

      const res = await addPatient(btoa(JSON.stringify(payload)));

      setCurrentStep('processing');
      // Simulate processing step
      await new Promise(resolve => setTimeout(resolve, 400));

      if (!res.success) {
        setCurrentStep('error');
        handleShowModal({ message: res?.message, type: 'ERROR', show: true });
        return;
      }

      // If YES is selected, show the syncing step briefly as requested
      if (selectors.cardiac_monitoring.title === 'YES') {
        setCurrentStep('syncing');
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setCurrentStep('success');

      // Show success message and wait before redirecting
      handleShowModal({
        message: 'Patient added successfully',
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
      handleShowModal({
        message: err?.message ?? 'Something went wrong',
        type: 'ERROR',
        show: true
      });
    } finally {
      setLoading(false);
    }
  });

  const handleUsernameChange = useCallback((username: string) => {
    setUsernameStatus('idle');
    handleUniqueFieldChange('username', username);
  }, [handleUniqueFieldChange]);

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

  const handleSelect =
    (type: string) => (title: string | undefined, id: string | undefined) => {
      setSelectors((prev) => {
        const updated = { ...prev, [type]: { title, id } };
        // Branch controls which cardiac monitoring sites are available.
        if (type === 'branch') {
          updated.site = { title: undefined, id: undefined };
          updated.doctor = { title: undefined, id: undefined };
          setValue('site', '');
          setValue('doctor', '');
        }
        // If site changes, reset doctor
        if (type === 'site') {
          updated.doctor = { title: undefined, id: undefined };
          setValue('doctor', '');
        }
        return updated;
      });
      setValue(type as any, id || title);
      clearErrors(type as any);
    };

  const setDobValue = (value: Date | undefined | null) => {
    const iso = value ? new Date(value).toISOString() : '';
    setValue('dob', iso as any, { shouldValidate: true });
    clearErrors('dob');
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await getPatientProtocols();
        if (!cancelled) {
          setProtocols({
            loading: false,
            data: res.success ? res.data : [],
            error: res.success ? '' : 'Unable to load monitoring protocols.',
          });
        }
      } catch {
        if (!cancelled) {
          setProtocols({
            loading: false,
            data: [],
            error: 'Unable to load monitoring protocols.',
          });
        }
      }
    })();

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    (async () => {
      setBranches({
        loading: true,
        data: [],
      });
      try {
        const res = await getOrganizationBranchesSelect();
        setBranches({
          loading: false,
          data: res.data,
        });
      } catch (error) {
        setBranches({
          loading: false,
          data: [],
        });
      }
    })();

    (async () => {
      setCities({
        loading: true,
        data: [],
      });
      try {
        const res = await getCities();
        setCities({
          loading: false,
          data: res.data,
        });
      } catch (error) {
        setCities({
          loading: false,
          data: [],
        });
      }
    })();

    (async () => {
      setCountries({
        loading: true,
        data: [],
      });
      try {
        const res = await getCountries();
        setCountries({
          loading: false,
          data: res.data,
        });
      } catch (error) {
        setCountries({
          loading: false,
          data: [],
        });
      }
    })();

    (async () => {
      setNurses({
        loading: true,
        data: [],
      });
      try {
        const res = await getOrganizationNurses();
        setNurses({
          loading: false,
          data: res.data,
        });
      } catch (error) {
        setNurses({
          loading: false,
          data: [],
        });
      }
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
    if (!selectors.site.id) {
      setDoctors({
        loading: false,
        data: [],
      });
      return;
    }

    (async () => {
      setDoctors({
        loading: true,
        data: [],
      });
      try {
        const res = await getSiteDoctors(selectors.site.id as string);
        setDoctors({
          loading: false,
          data: res.data,
        });
      } catch (error) {
        setDoctors({
          loading: false,
          data: [],
        });
      }
    })();
  }, [selectors.site.id]);

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
    nurses,
    sites,
    doctors,
    setDobValue,
    validator,
    currentStep,
    getLoadingStepInfo,
    usernameStatus,
    handleUsernameChange,
    handlePhoneNumberChange,
    uniqueErrors,
    uniqueChecking,
    hasUniqueConflict,
    handleUniqueFieldChange,
    protocols,
  ];
};

export default useFormHook;

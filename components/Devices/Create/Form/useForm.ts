'use client';

import { useState, useCallback, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';

import { createDevice, updateDevice, getSuperAdminBranches, createDeviceSuperadmin, getSites, getDoctorSites } from '@service';
import { showModalReducer } from '@slice';

import { useUser } from '@selectors';

import { validator } from './validator';

import type { UseFormProps, SelectedValuesProps, DeviceProps, LoadingStep, LoadingStepInfo } from './types';
import type { ModalState } from '@store-types';
import type { MeasurementType } from '@types';

const useFormHook = (
  prevData:
    | (DeviceProps & {
      id: string;
    })
    | undefined,
  categories: { name: string; value: string }[]
): any => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user] = useUser();

  const [selectedSerial, setSelectedSerial] = useState<string>('');
  const [branches, setBranches] = useState<any[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [selectors, setSelectors] = useState<any>({
    branch_id: undefined,
    site_id: undefined,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<LoadingStep>('idle');
  const [serials, setSerials] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<SelectedValuesProps>({
    category: {
      name: undefined,
      value: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm<DeviceProps>({
    resolver: vestResolver(validator),
    defaultValues: {
      serial_number: '',
    },
  });

  const handleSelectByAbd = useCallback(
    async (name: string, value: string) => {
      setValue('category', value as MeasurementType);
      clearErrors('category');

      setSelectedValues((prev) => ({
        ...prev,
        category: {
          name,
          value: value as MeasurementType,
        },
      }));

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/web/devices/devices/${value}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Something went wrong');
        const serials = data?.map((item: any) => item.serial_number).filter(Boolean);
        setSerials(serials);
      } catch (error) {

        setSerials([]);
      }
    },
    [setValue, clearErrors, user?.token]
  );


  const handleSelect = useCallback((name: string, value: string) => {
    setValue('category', value as MeasurementType);
    clearErrors('category');

    setSelectedValues((prev) => ({
      ...prev,
      category: {
        name,
        value: value as MeasurementType,
      },
    }));
  }, []);

  const handleShowModal = (payload: ModalState) => {
    dispatch(showModalReducer(payload));
  };

  // Function to get loading step information
  const getLoadingStepInfo = (step: LoadingStep): LoadingStepInfo => {
    const steps: Record<LoadingStep, LoadingStepInfo> = {
      idle: {
        step: 'idle',
        title: 'Ready',
        description: 'Device form is ready',
        progress: 0,
      },
      validating: {
        step: 'validating',
        title: 'Validating',
        description: 'Checking device information...',
        progress: 20,
      },
      preparing: {
        step: 'preparing',
        title: 'Preparing',
        description: 'Setting up device data...',
        progress: 40,
      },
      submitting: {
        step: 'submitting',
        title: 'Saving',
        description: 'Sending device data to server...',
        progress: 60,
      },
      processing: {
        step: 'processing',
        title: 'Processing',
        description: 'Finalizing device creation...',
        progress: 80,
      },
      syncing: {
        step: 'syncing',
        title: 'Syncing',
        description: 'Syncing with Vivalink system...',
        progress: 90,
      },
      success: {
        step: 'success',
        title: 'Success!',
        description: prevData ? 'Device updated successfully' : 'Device created successfully',
        progress: 100,
      },
      error: {
        step: 'error',
        title: 'Error',
        description: 'An error occurred during the process',
        progress: 0,
      },
    };
    return steps[step];
  };

  // Fetch branches for superadmin
  useEffect(() => {
    const fetchBranches = async () => {
      if ((user?.role as any) === 'SUPERADMIN') {
        const res = await getSuperAdminBranches();
        if (res?.success && Array.isArray(res.data)) {
          setBranches(res.data);
        }
      }
    };
    fetchBranches();
  }, [user]);

  const handleSelectSite = useCallback((siteId: string) => {
    setSelectors((prev: any) => ({ ...prev, site_id: siteId }));
    setValue('site_id' as any, siteId as any);
  }, [setValue]);

  // Fetch sites
  useEffect(() => {
    const fetchSites = async () => {
      if (user?.role === 'DOCTOR') {
        const res = await getDoctorSites();
        if (res?.success && res.data) {
          const sitesArray = Array.isArray(res.data) ? res.data : [res.data];
          setSites(sitesArray);

          // Pre-select if there's only one site and no site is selected yet
          if (sitesArray.length === 1 && !selectors.site_id && !prevData) {
            handleSelectSite(sitesArray[0].id);
          }
        }
      } else {
        const res = await getSites(1, 1000);
        if (res?.success && res.data?.data) {
          setSites(res.data.data);
        }
      }
    };
    fetchSites();
  }, [user?.role, handleSelectSite, selectors.site_id, prevData]);

  const handleSelectBranch = useCallback((branchId: string) => {
    setSelectors((prev: any) => ({ ...prev, branch_id: branchId }));
    try {
      // Extend form values to include optional branch_id for submission convenience
      setValue('branch_id' as any, branchId as any);
    } catch (_) { }
  }, [setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      setCurrentStep('validating');

      // Simulate validation
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentStep('preparing');

      // create case
      if (!prevData) {
        const payload: any = {
          title: data.title,
          description: data.description,
          category: data.category,
          serial_number: data.serial_number,
          cardiac_monitoring: data.cardiac_monitoring,
          site_id: selectors.site_id,
        };

        if ((user?.role as any) === 'SUPERADMIN') {
          payload.branch_id = selectors.branch_id;
        }

        setCurrentStep('submitting');
        const encoded = btoa(JSON.stringify(payload));
        const res = (user?.role as any) === 'SUPERADMIN'
          ? await createDeviceSuperadmin(encoded)
          : await createDevice(encoded);

        setCurrentStep('processing');
        if (!res.success) {
          setCurrentStep('error');
          handleShowModal({
            type: 'ERROR',
            message: data.cardiac_monitoring === 'YES'
              ? 'Sync failed. Please check the connection.'
              : (res?.message ?? 'Unable to create a new device'),
            show: true,
          });
          return;
        } else {
          if (data.cardiac_monitoring === 'YES') {
            setCurrentStep('syncing');
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          setCurrentStep('success');
          // Handle success case
          handleShowModal({
            type: 'SUCCESS',
            message: data.cardiac_monitoring === 'YES'
              ? 'Sync successful or The device successfully added.'
              : 'Device created successfully',
            show: true,
          });
          setTimeout(() => {
            router.push(`/${user.role?.toLocaleLowerCase()}/devices`);
          }, 2000);
          return;

        }
      } else {
        setCurrentStep('submitting');
        // update case
        const res = await updateDevice(
          btoa(
            JSON.stringify({
              title: data.title,
              description: data.description,
              category: data.category,
              serial_number: data.serial_number,
              cardiac_monitoring: data.cardiac_monitoring,
              site_id: selectors.site_id,
            })
          ),
          prevData.id
        );

        setCurrentStep('processing');
        if (!res.success) {
          setCurrentStep('error');
          handleShowModal({
            type: 'ERROR',
            message: data.cardiac_monitoring === 'YES'
              ? 'Sync failed. Please check the connection.'
              : (res?.message ?? 'Unable to update device'),
            show: true,
          });
          return;
        } else {
          if (data.cardiac_monitoring === 'YES') {
            setCurrentStep('syncing');
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          setCurrentStep('success');
          // Handle success case
          handleShowModal({
            type: 'SUCCESS',
            message: data.cardiac_monitoring === 'YES'
              ? 'Sync successful or The device successfully added.'
              : 'Device updated successfully',
            show: true,
          });
          setTimeout(() => {
            router.push(`/${user.role?.toLocaleLowerCase()}/devices`);
          }, 2000);
          return;

        }
      }
    } catch (err) {
      setCurrentStep('error');
    } finally {
      // We don't necessarily want to set loading false immediately if we are redirecting
      // but if error, we should.
      if (currentStep === 'error') {
        setLoading(false);
      }
    }
  });

  // for edit case
  useEffect(() => {
    if (prevData) {
      const isEcgWithMonitoring =
        prevData.cardiac_monitoring?.toUpperCase() === 'YES' && prevData.category === 'ECG';
      const serialNumber = isEcgWithMonitoring && prevData.serial_number && !prevData.serial_number.startsWith('ECG_Rec_')
        ? `ECG_Rec_${prevData.serial_number}`
        : prevData.serial_number || '';

      reset({
        ...prevData,
        serial_number: serialNumber,
        cardiac_monitoring: prevData.cardiac_monitoring?.toUpperCase() as any,
      });
      setSelectors((prev: any) => ({ ...prev, site_id: prevData.site_id }));
      setSelectedValues({
        category: {
          name:
            categories.find((cat) => cat.value === prevData.category)?.name ||
            prevData.category,
          value: prevData.category,
        },
        cardiac_monitoring: {
          name: prevData.cardiac_monitoring?.toUpperCase() || undefined,
          value: (prevData.cardiac_monitoring?.toUpperCase() as any) || undefined,
        },
      });
    }

    return () => { };
  }, [prevData]);

  return [register, onSubmit, errors, loading, selectedValues, setValue, handleSelect, handleSelectByAbd, serials, setSelectedSerial, selectedSerial, selectors, branches, handleSelectBranch, setSelectedValues, sites, handleSelectSite, currentStep, getLoadingStepInfo];
};

export default useFormHook;

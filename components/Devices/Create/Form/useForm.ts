'use client';

import { useState, useCallback, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';

import { createDevice, updateDevice, getSuperAdminBranches, createDeviceSuperadmin } from '@service';
import { showModalReducer } from '@slice';

import { useUser } from '@selectors';

import { validator } from './validator';

import type { UseFormProps, SelectedValuesProps, DeviceProps } from './types';
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
  const [selectors, setSelectors] = useState<any>({
    branch_id: undefined,
  });

  const [loading, setLoading] = useState<boolean>(false);
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
      // create case
      if (!prevData) {
        const payload: any = {
          title: data.title,
          description: data.description,
          category: data.category,
          serial_number: data.serial_number,
          cardiac_monitoring: data.cardiac_monitoring,
        };

        if ((user?.role as any) === 'SUPERADMIN') {
          payload.branch_id = selectors.branch_id;
        }

        const encoded = btoa(JSON.stringify(payload));
        const res = (user?.role as any) === 'SUPERADMIN'
          ? await createDeviceSuperadmin(encoded)
          : await createDevice(encoded);

        if (!res.success) {
          handleShowModal({
            type: 'ERROR',
            message: data.cardiac_monitoring === 'Yes'
              ? 'Sync failed. Please check the connection.'
              : (res?.message ?? 'Unable to create a new device'),
            show: true,
          });
          return;
        } else {
          // Handle success case
          handleShowModal({
            type: 'SUCCESS',
            message: data.cardiac_monitoring === 'Yes'
              ? 'Sync successful or The device successfully added.'
              : 'Device created successfully',
            show: true,
          });
          router.push(`/${user.role?.toLocaleLowerCase()}/devices`);
          return;

        }
      } else {
        // update case
        const res = await updateDevice(
          btoa(
            JSON.stringify({
              title: data.title,
              description: data.description,
              category: data.category,
              serial_number: data.serial_number,
              cardiac_monitoring: data.cardiac_monitoring,
            })
          ),
          prevData.id
        );

        if (!res.success) {
          handleShowModal({
            type: 'ERROR',
            message: data.cardiac_monitoring === 'Yes'
              ? 'Sync failed. Please check the connection.'
              : (res?.message ?? 'Unable to update device'),
            show: true,
          });
          return;
        } else {
          // Handle success case
          handleShowModal({
            type: 'SUCCESS',
            message: data.cardiac_monitoring === 'Yes'
              ? 'Sync successful or The device successfully added.'
              : 'Device updated successfully',
            show: true,
          });
          router.push(`/${user.role?.toLocaleLowerCase()}/devices`);
          return;

        }
      }

      // handleShowModal({
      //   type: 'SUCCESS',
      //   message: `Device ${prevData ? 'updated' : 'added'} successfully`,
      //   show: true,
      // });
      // router.push(`/${user.role?.toLocaleLowerCase()}/devices`);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  });

  // for edit case
  useEffect(() => {
    if (prevData) {
      reset(prevData);
      setSelectedValues({
        category: {
          name:
            categories.find((cat) => cat.value === prevData.category)?.name ||
            prevData.category,
          value: prevData.category,
        },
        cardiac_monitoring: {
          name: prevData.cardiac_monitoring || undefined,
          value: (prevData.cardiac_monitoring as any) || undefined,
        },
      });
    }

    return () => { };
  }, [prevData]);

  return [register, onSubmit, errors, loading, selectedValues, setValue, handleSelect, handleSelectByAbd, serials, setSelectedSerial, selectedSerial, selectors, branches, handleSelectBranch, setSelectedValues];
};

export default useFormHook;

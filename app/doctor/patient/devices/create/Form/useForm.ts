'use client';

import { useState, useCallback, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';

import { assignDevice, updateDevice } from '@service';
import { showModalReducer } from '@slice';

import { useUser } from '@selectors';

import { validator } from './validator';
import { useSearchParams } from 'next/navigation';
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

  const searchParams = useSearchParams();
  const patientId = searchParams?.get('patient_id');
  const dispatch = useDispatch();
  const router = useRouter();
  const [user] = useUser();

  const [selectedSerial, setSelectedSerial] = useState<string>('');
  const [disableFields, setDisableFields] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [serials, setSerials] = useState<string[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [deviceList, setDeviceList] = useState<any[]>([]);
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

      setSelectedValues({
        category: {
          name,
          value: value as MeasurementType,
        },
      });

      try {
        const res = await fetch(`/api/v1/web/devices/devices/${value}`, {
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
        setDeviceList(data);
      } catch (error) {
        setSerials([]);
      }
    },
    [setValue, clearErrors, user?.token]
  );

  const handleSelectField = useCallback(
    async (field: string, value: any) => {
      setSelectedValues((prev) => ({
        ...prev,
        [field]: value,
      }));

      if (field === 'serial_number') {
        const selectedSerial = value.name;
        setSelectedSerial(selectedSerial);
        setValue('serial_number', selectedSerial);
        clearErrors('serial_number');

        const selectedDevice = deviceList.find(
          (device) => device.serial_number === selectedSerial
        );

        if (selectedDevice) {
          setSelectedDeviceId(selectedDevice.id);
          setValue('title', selectedDevice.title || '');
          setValue('description', selectedDevice.description || '');
          setDisableFields(true);
        } else {
          setValue('title', '');
          setValue('description', '');
          setDisableFields(false);
        }
      }
    },
    [setValue, clearErrors, deviceList]
  );


  const handleSelect = useCallback((name: string, value: string) => {
    setValue('category', value as MeasurementType);
    clearErrors('category');

    setSelectedValues({
      category: {
        name,
        value: value as MeasurementType,
      },
    });
  }, []);

  const handleShowModal = (payload: ModalState) => {
    dispatch(showModalReducer(payload));
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if (!prevData) {
        const res = await assignDevice(
          btoa(
            JSON.stringify({
              device_id: selectedDeviceId,
              issued_to: patientId,
            })
          )
        );

        if (!res.success) {
          handleShowModal({
            type: 'ERROR',
            message: res?.message ?? 'Unable to create a new device',
            show: true,
          });
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
            })
          ),
          prevData.id
        );

        if (!res.success) {
          handleShowModal({
            type: 'ERROR',
            message: res?.message ?? 'Unable to update device',
            show: true,
          });
          return;
        }
      }

      handleShowModal({
        type: 'SUCCESS',
        message: `Device ${prevData ? 'updated' : 'added'} successfully`,
        show: true,
      });
      router.push(`/${user.role?.toLocaleLowerCase()}/patient/devices?patient=${patientId}`);
      // router.back();
    } catch (err) {
      console.error('err >>>>', err);
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
      });
    }

    return () => { };
  }, [prevData]);

  return [register, onSubmit, errors, loading, selectedValues, setValue, handleSelect, handleSelectByAbd, serials, setSelectedSerial, selectedSerial, handleSelectField, disableFields];
};

export default useFormHook;

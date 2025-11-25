'use client';

import { useState, useCallback, useEffect, useMemo, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useDispatch } from 'react-redux';

import { debounce } from '@init-globals';

import { showModalReducer } from '@slice';

import { useUser } from '@selectors';

import { getAllPatients } from '../../../Devices/Assign/Form/service';
import { getSingleTablet, manageTablet } from '@service';

import { validator } from './validator';

import type { UseFormProps, PatientData, AssignPatientTablet } from './types';
import type { ModalState } from '@store-types';

const useFormHook = (tabletId: string): UseFormProps => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user] = useUser();

  const [loading, setLoading] = useState<boolean>(false);

  const [searching, setSearching] = useState<boolean>(false);

  const [patients, setPatients] = useState<PatientData[]>([]);

  const [selectedPatients, setSelectedPatients] = useState<PatientData[]>([]);
  const _selectedPatients = useMemo(() => selectedPatients, [selectedPatients]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AssignPatientTablet>({
    resolver: vestResolver(validator),
  });

  const handleShowModal = (payload: ModalState) => {
    dispatch(showModalReducer(payload));
  };

  const onChange = debounce(async (event: ChangeEvent<HTMLInputElement>[]) => {
    const value = event[0]?.target.value;

    try {
      setSearching(true);
      const res = await getAllPatients();
      if (!res.success) return;
      setPatients(res.data);
    } catch (err: any) {
      console.log(err?.message);
    } finally {
      setSearching(false);
    }
  }, 1000);

  const handleSelectPatient = useCallback(
    (patient: PatientData) => {
      if (selectedPatients.length >= 1) return;
      if (selectedPatients.find((p) => p.id === patient.id)) return;
      setSelectedPatients([patient]);
    },
    [selectedPatients]
  );

  const handleRemovePatient = useCallback((patient: PatientData) => {
    setSelectedPatients((prev) => prev.filter((p) => p.id !== patient.id));
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const res = await manageTablet(
        btoa(
          JSON.stringify({
            tablet_id: tabletId,
            patient_ids: _selectedPatients.map((el) => el.id),
          })
        )
      );

      if (res?.message) {
        handleShowModal({
          type: 'ERROR',
          message: res?.message ?? 'Something went wrong',
          show: true,
        });

        return;
      }

      handleShowModal({
        type: 'SUCCESS',
        message: 'Tablet management successful',
        show: true,
      });
      router.push(`/${user.role?.toLocaleLowerCase()}/tablets`);
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    (async () => {
      try {
        if (tabletId === '' || !tabletId) return;

        setLoading(true);

        const res = await getSingleTablet(tabletId);
        if (!res.success) return;



        setValue('tablet_id', res?.data?.serial_number);
        setSelectedPatients(
          res.data.patient_tablets.map((el) => ({
            id: el.issued_to.user.id,
            first_name: el.issued_to.user.first_name,
            middle_name: el.issued_to.user.middle_name,
            last_name: el.issued_to.user.last_name,
            email: el.issued_to.user.email,

          }))
        );
      } catch (err: any) {
      } finally {
        setLoading(false);
      }
    })();
    return () => { };
  }, [tabletId, setValue]);

  return [
    register,
    onSubmit,
    errors,
    loading,
    onChange,
    searching,
    patients,
    _selectedPatients,
    handleSelectPatient,
    handleRemovePatient,
  ];
};

export default useFormHook;

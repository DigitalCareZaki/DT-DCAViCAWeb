'use client';

import { useCallback, useState, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { vestResolver } from '@hookform/resolvers/vest';

import { showModalReducer } from '@slice';
import { searchTelemedUsers, addTelemed } from '@service';
import { getRequestedAppointments } from '@service';

import { validator } from './validator';

import type { ModalState } from '@store-types';
import type { AddAppointmentProps, UseFormProps } from './types';
import type { SearchTelemedResProps } from '@types';

// Accept options object with setAppointments
interface UseFormOptions {
  setAppointments?: (appointments: any[]) => void;
}
const useFormHook = ({ setAppointments }: UseFormOptions = {}) => {
  const dispatch = useDispatch();
  const router = useRouter();


  const [loading, setLoading] = useState<boolean>(false);
  const [selectors, setSelectors] = useState<{
    type: string;
    about: string;
  }>({
    type: 'ONLINE',
    about: '',
  });
  const [selectedTime, setSelectedTime] = useState<{
    startTime: Date | null;
    endTime: Date | null;
  }>({
    startTime: null,
    endTime: null,
  });
  const [selectedUsers, setSelectedUsers] = useState<SearchTelemedResProps[]>(
    []
  );

  const [users, setUsers] = useState<SearchTelemedResProps[]>([]);


  const [searching, setSearching] = useState<boolean>(false);
  const searchRequest = useRef<number>(0);

  const _selectors = useMemo(() => selectors, [selectors]);
  const _selectedTime = useMemo(() => selectedTime, [selectedTime]);
  const _users = useMemo(() => users, [users]);
  const _selectedUsers = useMemo(() => selectedUsers, [selectedUsers]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<AddAppointmentProps>({
    resolver: vestResolver(validator),
    defaultValues: { type: 'ONLINE' },
  });

  const handleShowModal = (payload: ModalState) =>
    dispatch(showModalReducer(payload));

  const handleSelectors = useCallback(
    (type: string, value: string) => {
      setValue(type as any, value);
      setSelectors((prev) => ({ ...prev, [type]: value }));
      clearErrors(type as any);
    },
    [setValue, clearErrors]
  );

  const handleSelectTme = useCallback((startTime: Date, endTime: Date) => {
    setSelectedTime({
      startTime,
      endTime,
    });
  }, []);

  // Called with the debounced query; an empty query lists every available doctor.
  // Only the latest request may update the list, since responses can arrive out of order.
  const handleSearchUser = useCallback(async (query: string) => {
    const request = ++searchRequest.current;

    try {
      setSearching(true);
      const res = await searchTelemedUsers(query);
      if (request !== searchRequest.current || !res.success) return;
      setUsers(res?.data ?? []);
    } catch (err: any) {
      console.log(err?.message);
    } finally {
      if (request === searchRequest.current) setSearching(false);
    }
  }, []);

  const handleSelectUser = useCallback(
    (user: SearchTelemedResProps) => {
      setSelectedUsers([user]);
    },
    []
  );

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      if (!selectedTime.endTime || !selectedTime.startTime) {
        handleShowModal({
          type: 'ERROR',
          message: 'Select time slot',
          show: true,
        });

        return;
      }

      if (!selectedUsers.length) {
        handleShowModal({
          type: 'ERROR',
          message: 'Select user',
          show: true,
        });

        return;
      }

      const payload = {
        ...data,
        type: selectors.type,
        about: selectors.about,
        start_date: selectedTime.startTime,
        end_date: selectedTime.endTime,
        users: selectedUsers.map((u) => u.id),
      };

      const res = await addTelemed(btoa(JSON.stringify(payload)));


      if (!res.success) {
        handleShowModal({
          type: 'ERROR',
          message: res?.message,
          show: true,
        });

        return;
      }

      handleShowModal({
        type: 'SUCCESS',
        message: 'Appointment added successfully',
        show: true,
      });

      // Fetch latest appointments after successful add
      const appointmentsRes = await getRequestedAppointments();
      if (setAppointments) {
        setAppointments(appointmentsRes.data || []);
        router.back();
      }
      // Do not navigate away
    } catch (err: any) {
      handleShowModal({
        show: true,
        message: err?.message ?? 'Something wrong',
        type: 'ERROR',
      });
    } finally {
      setLoading(false);
    }
  });

  return [
    register,
    onSubmit,
    errors,
    loading,
    handleSelectors,
    _selectors,
    _selectedTime,
    handleSelectTme,
    handleSearchUser,
    searching,
    _users,
    handleSelectUser,
    _selectedUsers,
  ];
};

export default useFormHook;

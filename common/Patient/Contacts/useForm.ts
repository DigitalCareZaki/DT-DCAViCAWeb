'use client';

import { useState } from 'react';
import { vestResolver } from '@hookform/resolvers/vest';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { addPatientContact } from '@service';
import { pushIntoPatientContactListingReducer } from '@slice';

import { validator } from './validator';

import type { CreateContactProps, useFormProps } from './types';
import type { PatientContactsProps } from '@types';

const useFormHook = (
  patient: string,
  handleHideForm: () => void
): useFormProps => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setResError] = useState<string>('');

  const dispatch = useDispatch();

  const setContacts = (contact: PatientContactsProps) =>
    dispatch(pushIntoPatientContactListingReducer({ contact }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateContactProps>({
    resolver: vestResolver(validator),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const res = await addPatientContact(
        btoa(
          JSON.stringify({
            email: data.email,
            number: data.phone,
            name: data.name,
            relationship: data.relationship,
          })
        ),
        patient
      );

      if (!res.success) {
        setResError(res.message);

        return;
      }

      delete res?.success;
      setContacts(res);
      reset();
      handleHideForm.call(this);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  });

  return [register, onSubmit, errors, loading, error];
};

export default useFormHook;

'use client';

import { ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import {
  toggleDoctorContactReducer,
  setPatientContactListReducer,
} from '@slice';

import { InputBasic, ButtonPrimary } from '@common';
import { getPatientContacts } from '@actions';
import { debounce } from '@init-globals';

import type { ClientComponent, PatientContactsProps } from '@types';

const ContactHeader: ClientComponent = () => {
  const dispatch = useDispatch();
  const params = useSearchParams();

  const handleAddContactsClick = () => {
    dispatch(toggleDoctorContactReducer());
  };
  const setContacts = (data: PatientContactsProps[]) => {
    dispatch(
      setPatientContactListReducer({
        contacts: data,
      })
    );
  };

  const handleSearch = debounce(async (e: ChangeEvent<HTMLInputElement>[]) => {
    const res = await getPatientContacts(
      params?.get('patient') ?? '',
      e[0]?.target?.value
    );

    if (!res.success) return;

    setContacts(res?.data);
  }, 1000);

  return (
    <div className="flex w-full justify-between">
      <span className="screen-title">Contacts</span>
      <div className="flex w-fit items-center gap-4">
        <div className="flex w-60">
          <InputBasic
            placeholder="Search"
            icon="IoSearch"
            borderTheme
            onChange={handleSearch}
          />
        </div>
        <div className="w-32">
          <ButtonPrimary
            title="Add contacts"
            name="Add Contacts"
            className="h-10 rounded-lg"
            variant="icon"
            icon="IoMdAdd"
            onClick={handleAddContactsClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;

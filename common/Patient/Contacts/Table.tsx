'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ClientTable } from '@common';
import { setPatientContactListReducer } from '@slice';

import RenderTable from './RenderTable';

import type { ClientComponentProps, PatientContactsProps } from '@types';

const ContactTable: ClientComponentProps<{
  data: PatientContactsProps[];
}> = ({ data }) => {
  const dispatch = useDispatch();

  const setContacts = (contacts: PatientContactsProps[]) => {
    dispatch(setPatientContactListReducer({ contacts }));
  };

  useEffect(() => {
    setContacts(data);
  }, [data]);

  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
      <ClientTable heads={['Name', 'Email', 'Phone', 'Relationship', 'Action']}>
        <RenderTable />
      </ClientTable>
    </div>
  );
};

export default ContactTable;

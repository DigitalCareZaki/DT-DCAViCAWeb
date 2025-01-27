'use server';

import ContactTable from './Table';
import Header from './Header';
import Form from './Form';

import { getPatientContacts, getUserTypeHeaders } from '@actions';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const Contacts: ServerComponentProps<Props> = async ({ patient }) => {
  if (!patient) throw new Error('Patient undefine');

  const type = await getUserTypeHeaders();

  const res = await getPatientContacts(patient, undefined, type?.toLowerCase());

  if (!res.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      <Header />
      <ContactTable data={res.data} />
      <Form />
    </div>
  );
};

export default Contacts;

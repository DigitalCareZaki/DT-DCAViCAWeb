'use server';

import { PatientContacts } from '@common';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const ContactsWrapper: ServerComponentProps<Props> = async ({ patient }) => {
  return <PatientContacts patient={patient} />;
};

export default ContactsWrapper;

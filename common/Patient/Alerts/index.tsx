'use server';

import Header from './Header';
import Form from './Form';
import Table from './Table';

import { getPatientReadingRange } from '@service';

import { Props } from './types';
import type { ServerComponentProps } from '@types';

const Alerts: ServerComponentProps<Props> = async ({ patient }) => {
  if (!patient) throw new Error('Patient not defined');

  const res = await getPatientReadingRange(patient);

  if (!res.success) return <></>;

  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      <Header />
      <Table data={res.data} />
      <Form />
    </div>
  );
};

export default Alerts;

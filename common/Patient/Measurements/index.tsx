'use server';

import { twMerge } from 'tailwind-merge';

import Header from './Header';
import Banner from './Banner';
import Table from './Table';
import Form from './Form';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const Measurements: ServerComponentProps<Props> = async ({
  data,
  patient,
  type,
  fullHeight,
  leftPadding,
  hideActions, user,
}) => {
  return (
    <div
      className={twMerge(
        'flex w-full flex-col gap-6 pt-6',
        fullHeight ? 'h-screen' : 'h-full',
        leftPadding && 'px-10 pr-0'
      )}
    >
      <Header hideActions={hideActions} data={data} />
      <Banner patient={patient} type={type} />
      <Table data={data} user={user} />
      <Form />
    </div>
  );
};

export default Measurements;

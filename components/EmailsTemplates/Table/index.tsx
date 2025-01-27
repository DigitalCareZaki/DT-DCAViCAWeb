'use client';

import { ClientTable, ClientGenerator } from '@common';
import { useEffect, useState } from 'react';

import Row from './Row';

import type {
  ClientComponentProps,
  EmailTemplatesProps as EmailDataProps,
} from '@types';
import type { EmailTemplatesProps } from './types';

const Table: ClientComponentProps<EmailTemplatesProps> = ({ data }) => {
  const [templates, setTemplates] = useState<EmailDataProps[]>([]);

  useEffect(() => {
    if (!data) return;

    setTemplates(data?.map((el) => ({ ...el, customKey: el?.key })));
  }, [data]);

  return (
    <div className="relative mt-10 overflow-x-hidden overflow-y-hidden shadow-md sm:rounded-lg">
      <ClientTable heads={['Key', 'Subject', 'Created At', 'Active', 'Action']}>
        <ClientGenerator data={templates}>
          <Row />
        </ClientGenerator>
      </ClientTable>
    </div>
  );
};

export default Table;

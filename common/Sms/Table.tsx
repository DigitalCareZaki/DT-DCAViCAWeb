'use client';

import { useEffect, useState } from 'react';

import { ClientGenerator, ClientTable } from '@common';
import Row from './Row';

import type { EmailsHistoryProps, ClientComponentProps } from '@types';
import type { TableProps } from './types';

const Table: ClientComponentProps<any> = ({ data }) => {
  const [sms, setSms] = useState<any>([]);

  useEffect(() => {
    if (!data) return;
    setSms(data);
  }, [data]);

  return (
    <div className="sms-history-table-wrapper relative mt-4 overflow-x-auto overflow-y-visible pb-2 shadow-md sm:rounded-lg">
      <ClientTable
        className="sms-history-table"
        heads={[
          'To',
          'Body',
          'Created At',
        ]}
      >
        {sms && sms.length > 0 ? (
          <ClientGenerator data={sms ?? []}>
            <Row />
          </ClientGenerator>
        ) : (
          <tr className="border-b bg-white">
            <td className="px-6 py-4 text-center" colSpan={3}>
              No records found.
            </td>
          </tr>
        )}
      </ClientTable>
    </div>
  );
};
export default Table;

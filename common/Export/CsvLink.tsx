'use client';

import { CSVLink } from 'react-csv';

import type { ClientComponentProps } from '@types';
import type { ExportProps } from './types';

const CsvLink: ClientComponentProps<ExportProps<Record<string, any>>> = ({
  data,
  headers,
  filename,
}) => {
  return (
    <CSVLink
      data={data}
      headers={headers}
      filename={`${filename}.csv`}
      className="theme-bg-color flex h-10 w-full cursor-pointer items-center justify-center rounded-md text-xs font-semibold text-white transition duration-300 hover:shadow-lg"
    >
      <button>Export CSV</button>
    </CSVLink>
  );
};

export default CsvLink;

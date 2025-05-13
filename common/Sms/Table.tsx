'use client';

import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { ClientGenerator, ClientTable } from '@common';
import Row from './Row';

import type { ClientComponentProps } from '@types';
import type { TableProps } from './types';
import { getSmsHistory } from '@service';

const Table: ClientComponentProps<TableProps> = () => {

  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    const response = await getSmsHistory(page, 10);
    if (response.success) {
      setData(response.data.data || []);
      setHasNextPage(response.data.pagination?.hasNextPage);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleNext = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="relative mt-10 overflow-x-hidden overflow-y-hidden shadow-md sm:rounded-lg">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
          <div className="border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin" />
        </div>
      )}
      <ClientTable
        heads={[
          'To',
          'Body',
          'Created At',
        ]}
      >
        <ClientGenerator data={data || []}>
          <Row />
        </ClientGenerator>
      </ClientTable>
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1 || loading}
          className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300"
        >
          <FaArrowLeft />
        </button>
        <span>Page 1 of {page}</span>
        <button
          onClick={handleNext}
          disabled={!hasNextPage || loading}
          className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
export default Table;

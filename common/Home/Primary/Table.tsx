'use client';

import type { ClientComponentProps } from '@types';
import { ClientTable } from '@common';
import { useState } from 'react';
import RenderTable from './RenderTable';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

const Table: ClientComponentProps<any> = ({ userType, data, pagination, fetchData, isLoading }: any) => {
  const [page, setPage] = useState(1);

  return (
    <div className="relative overflow-x-auto pb-8 shadow-md sm:rounded-lg">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      <ClientTable
        heads={[
          'Patient Name',
          'Patient Email',
          'Glucose',
          'Blood Pressure',
          'Temperature',
          // 'Medication',
          'SPO2',
          'ECG',
        ]}
      >
        <RenderTable userType={userType} data={data} />
      </ClientTable>

      {/* Pagination Controls */}
      {pagination && (
        <div className="flex justify-center mt-4">
          <button
            disabled={!pagination?.hasPrevPage || isLoading}
            onClick={() => {
              fetchData(page - 1);
              setPage((prev) => prev - 1)
            }
            }
            className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 flex items-center justify-center"
          >
            <FaArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <span className="px-4 py-2 text-black">{`Page ${pagination.currentPage} of ${pagination.totalPages}`}</span>
          <button
            disabled={!pagination?.hasNextPage || isLoading}
            onClick={() => {
              fetchData(page + 1);
              setPage((prev) => prev + 1)
            }}
            className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 flex items-center justify-center"
          >
            <FaArrowRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;

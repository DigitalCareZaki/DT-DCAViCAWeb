'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { twMerge } from 'tailwind-merge';

import { SetSelectedComplianceMedicineReducer } from '@slice';

import { ClientTable } from '@common';

import type { ClientComponent } from '@types';
import { PatientCompliance, PatientCompliancePerPill } from '@types';
import type { ReduxProps, StoreComplianceState } from '@store-types';

type MedicationWithComplianceDates = {
  id: string;
  name: string;
  compliance: PatientCompliance;
  created_at?: string;
  startDate: string;
  endDate: string;
};

// Helper function to extract start and end dates from compliance data
const getComplianceDateRange = (compliance: PatientCompliance): { startDate: string; endDate: string } => {
  const dates = Object.keys(compliance).sort();

  if (dates.length === 0) {
    return { startDate: '-', endDate: '-' };
  }

  const startDate = dates[0];
  const endDate = dates[dates.length - 1];

  return {
    startDate: new Date(startDate).toLocaleDateString(),
    endDate: new Date(endDate).toLocaleDateString(),
  };
};

const RenderTable = ({
  medications,
  selected,
  setMed,
}: {
  medications: MedicationWithComplianceDates[];
  selected: string;
  setMed: (id: string, data: PatientCompliance) => void;
}) =>
  medications.map((el) => (
    <tr
      key={el.id}
      className={twMerge(
        'cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200',
        selected === el.id ? 'bg-blue-400' : ''
      )}
      onClick={() => setMed(el.id, el.compliance)}
    >
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
      >
        {el.name}
      </th>
      <td className="whitespace-nowrap px-6 py-4 text-gray-900">
        {el.startDate}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-gray-900">
        {el.endDate}
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-gray-900">
        {el.created_at ? new Date(el.created_at).toLocaleString() : '-'}
      </td>

    </tr>
  ));

const MedicationTable: ClientComponent = () => {
  const { data, selected } = useSelector<ReduxProps, StoreComplianceState>(
    (state) => state.compliance
  );
  const [medications, setMedications] = useState<MedicationWithComplianceDates[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const dispatch = useDispatch();

  const setMed = useCallback((id: string, data: PatientCompliance) => {
    dispatch(
      SetSelectedComplianceMedicineReducer({
        data: {
          id,
          data,
        },
      })
    );
  }, []);

  useEffect(() => {
    // Map medications to include created_at and start/end dates from compliance data
    setMedications(
      data.medications.map((med: any) => {
        const { startDate, endDate } = getComplianceDateRange(med.compliance);
        return {
          ...med,
          created_at: med.created_at,
          startDate,
          endDate,
        };
      })
    );
  }, [data.user.id]);

  useEffect(() => {
    setSelectedId(selected.id ?? '');
  }, [selected.id]);

  // Calculate pagination
  const totalItems = medications.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentMedications = medications.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
      {/* Page Size Selector */}
      {/* <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Show:</span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-700">entries</span>
        </div>
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
        </div>
      </div> */}

      <ClientTable heads={['Medication Name', 'Start Date', 'End Date', 'Created At']}>
        <RenderTable
          medications={currentMedications}
          setMed={setMed}
          selected={selectedId ?? ''}
        />
      </ClientTable>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-1">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded px-3 py-1 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100 hover:text-gray-700"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                disabled={page === '...'}
                className={twMerge(
                  'rounded px-3 py-1 text-sm font-medium',
                  page === currentPage
                    ? 'bg-blue-500 text-white'
                    : page === '...'
                      ? 'cursor-default text-black'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                )}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded px-3 py-1 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100 hover:text-gray-700"
            >
              <FaArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicationTable;

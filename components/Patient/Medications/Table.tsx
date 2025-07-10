'use client';

import { ClientTable } from '@common';
import { useEffect, useState } from 'react';
import RenderTable from './RenderTable';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import type { TableProps } from './types';
import type { ClientComponentProps } from '@types';
import { getTodayMedicationAlerts } from '@service';


interface MedicationData {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  time: string;
  dosage: string;
  frequency: number;
  unit: string;
  created_at: string;
  updated_at: string;
  patient_medication_alerts: any[];
}

interface Pagination {
  totalItems: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

interface TableResponse {
  data: MedicationData[];
  pagination: Pagination;
}


const Table: ClientComponentProps<TableProps> = ({ data }) => {

  const [page, setPage] = useState(1);
  const [medications, setMedications] = useState<MedicationData[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchMedications = async (pageNumber: number) => {
    setLoading(true);
    const res = await getTodayMedicationAlerts(pageNumber, 5);

    if (res.success) {
      setMedications(res?.data?.data);
      setPagination(res?.data?.pagination);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMedications(page);
  }, [page]);

  const handleNext = () => {
    if (pagination?.hasNextPage) setPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };



  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">

      {/* Loader overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      <ClientTable
        heads={[
          'Name',
          'Start Date',
          'End Date',
          'Time',
          'Frequency',
          'Dosage',
          'Status',
          'Created At',
        ]}
      >
        <RenderTable data={medications} />
      </ClientTable>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1 || loading}
          className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 flex items-center justify-center"
        >
          <FaArrowLeft />
        </button>
        <span className="text-md text-gray-700">
          Page {page} of {pagination?.totalPages || 1}
        </span>
        <button
          onClick={handleNext}
          disabled={!pagination?.hasNextPage || loading}
          className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 flex items-center justify-center"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Table;

'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { getPatientMedications } from '@actions';
import { setPatientMedicationListingReduer } from '@slice';

import Header from './Header';
import Table from './Table';
import Form from './Form';
import Pagination from './Pagination';

import type { FC } from 'react';
import type { Props } from './types';
import type { PatientMedicationProps } from '@types';

const mainStyle = {
  transform: 'scale(0.67)', // Scales the layout to 67%
  transformOrigin: 'top left', // Keeps scaling origin at the top left corner
  width: '150%', // Compensates for scaling width
  height: '150%', // Compensates for scaling height
  overflow: 'hidden', // Prevents overflow due to scaling
};

const Medication: FC<Props> = ({
  patient,
  hideCreateMedicationBtn,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [data, setData] = useState<PatientMedicationProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    totalItems: 0,
    perPage: 10,
    currentPage: 1,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null as number | null,
    prevPage: null as number | null,
  });

  useEffect(() => {
    const loadMedications = async () => {
      if (!patient) return;

      try {
        // Only show main loading for initial load or page changes, not for search
        if (searchTerm === '') {
          setLoading(true);
        } else {
          setSearchLoading(true);
        }

        const res = await getPatientMedications(patient, searchTerm, currentPage, itemsPerPage);

        if (res.success) {
          setData(res.data);
          setPagination(res.pagination);
          dispatch(setPatientMedicationListingReduer({ medications: res.data }));
        }
      } catch (error) {
        console.error('Error loading medications:', error);
      } finally {
        setLoading(false);
        setSearchLoading(false);
      }
    };

    loadMedications();
  }, [patient, searchTerm, currentPage, itemsPerPage, dispatch]);

  // Reset to first page when patient or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [patient, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = useCallback((searchValue: string) => {
    setSearchTerm(searchValue);
  }, []);

  // Memoize the Header component to prevent unnecessary re-renders
  const headerComponent = useMemo(() => (
    <Header
      hideCreateMedicationBtn={hideCreateMedicationBtn}
      data={data}
      onSearch={handleSearch}
      searchLoading={searchLoading}
    />
  ), [hideCreateMedicationBtn, data, handleSearch, searchLoading]);

  // Memoize the table and pagination to prevent re-renders during search
  const tableComponent = useMemo(() => (
    <Table data={data} />
  ), [data]);

  const paginationComponent = useMemo(() => (
    <Pagination
      currentPage={pagination.currentPage}
      totalPages={pagination.totalPages}
      onPageChange={handlePageChange}
      totalItems={pagination.totalItems}
      itemsPerPage={pagination.perPage}
      hasNextPage={pagination.hasNextPage}
      hasPrevPage={pagination.hasPrevPage}
      nextPage={pagination.nextPage}
      prevPage={pagination.prevPage}
    />
  ), [pagination, handlePageChange]);

  if (!patient) return <div>Patient not define</div>;
  if (loading) return <div
    style={mainStyle} // Apply the zoom-out effect here
    className="flex h-full w-screen items-center justify-center bg-background"
  >
    <div
      className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    ></div>
  </div>;

  return (
    <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
      {headerComponent}
      {tableComponent}
      {paginationComponent}
      <Form />
    </div>
  );
};

export default Medication;

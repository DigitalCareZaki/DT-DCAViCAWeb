'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ClientTable } from '@common';
import { setPatientAppointmentsListingReducer } from '@slice';

import RenderTable from './RenderTable';
import { getAppointmentSuperAdmin } from '@service';

import type { TableProps } from './types';
import type { ClientComponentProps, PatientNursesProps } from '@types';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

const Table: ClientComponentProps<any> = ({ }) => {

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    perPage: 10,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
    prevPage: null
  });
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const setData = (appointments: any, paginationData: any) => dispatch(setPatientAppointmentsListingReducer({ appointments, pagination: paginationData }));


  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      const res = await getAppointmentSuperAdmin(1, 10);

      if (res?.success) {
        setData(res.data.data, res.data.pagination);
        setPagination(res.data.pagination);
      }
      setLoading(false);
      setInitialLoad(false);
    };

    if (initialLoad) {
      fetchInitialData();
    }
  }, [initialLoad]);

  const handlePageChange = async (page: number) => {
    setLoading(true);
    setCurrentPage(page);

    let appointments = await getAppointmentSuperAdmin(
      page,
      pagination.perPage
    );

    if (appointments?.success) {
      setData(appointments.data.data, appointments.data.pagination);
      setPagination(appointments.data.pagination);
    }

    setLoading(false);
  };

  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        )}
        <ClientTable heads={['Title', 'Description', 'Type', 'Appointment Date', 'Appointment Time', 'Status', 'Diagnosis']}>
          {!loading && !initialLoad ? <RenderTable /> : <></>}
        </ClientTable>
      </div>
      {/* Pagination Controls */}
      {!loading && !initialLoad && (
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination?.hasPrevPage}
              className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 flex items-center justify-center"
            >
              <FaArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <span className="text-gray-700 font-medium">
              Page {pagination?.currentPage} of {pagination?.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination?.hasNextPage}
              className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 flex items-center justify-center"
            >
              <FaArrowRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;

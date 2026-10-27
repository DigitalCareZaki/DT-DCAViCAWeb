'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setEmrRecordsSlice } from '@slice';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

import TableRender from './Table';

import type { ClientComponentProps } from '@types';
import type { ReduxProps, StoreEMRState } from '@store-types';
import { getPatientEMRRecords } from '@service';

const Table: ClientComponentProps<any> = ({ patient_id }: any) => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector<ReduxProps, StoreEMRState>((state) => state.emr);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);

  // a new search always starts from the first page
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    // drop responses for a page/search that is no longer current
    let ignore = false;

    const fetchReports = async () => {
      setLoading(true);
      const response = await getPatientEMRRecords(patient_id, page, 10, searchTerm);
      if (ignore) return;

      setLoading(false);
      if (!response.success) return;

      dispatch(setEmrRecordsSlice({ records: response.data?.data || [] }));
      setTotalPages(response.data?.pagination?.totalPages || 1);
      setHasNextPage(!!response.data?.pagination?.hasNextPage);
    };

    fetchReports();

    return () => {
      ignore = true;
    };
  }, [page, searchTerm]);

  const handleNext = () => {
    if (hasNextPage) setPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  return (
    <div className="h-full w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      {!loading ? <TableRender /> : <></>}

      {!loading && (
        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="flex items-center justify-center rounded-full bg-gray-200 px-5 py-2.5 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <span className="text-lg text-black">Page {page} of {totalPages}</span>
          <button
            onClick={handleNext}
            disabled={!hasNextPage}
            className="flex items-center justify-center rounded-full bg-gray-200 px-5 py-2.5 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaArrowRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;

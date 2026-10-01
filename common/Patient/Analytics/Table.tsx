'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ClientTable } from '@common';
import { setPatientAppointmentsListingReducer } from '@slice';

import Header from './Header';
import RenderTable from './RenderTable';
import { getAnalytics } from '@service';

import type { AnalyticsQuery } from './types';
import type { ClientComponentProps } from '@types';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

const PER_PAGE = 10;

const heads = ['Title', 'Description', 'Type', 'Appointment Date', 'Appointment Time', 'Status', 'Diagnosis', 'Patient', 'Feedback', 'Action'];

const initialQuery: AnalyticsQuery = { page: 1, search: '', date: '' };

const initialPagination = {
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
  perPage: PER_PAGE,
  hasNextPage: false,
  hasPrevPage: false,
  nextPage: null,
  prevPage: null
};

const Table: ClientComponentProps<any> = ({ }) => {

  const dispatch = useDispatch();
  const [query, setQuery] = useState<AnalyticsQuery>(initialQuery);
  const [searchInput, setSearchInput] = useState('');
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  // Only the latest request may update the table, so a slow stale response can't overwrite newer results
  const latestRequest = useRef(0);

  const setData = useCallback(
    (appointments: any, paginationData: any) => dispatch(setPatientAppointmentsListingReducer({ appointments, pagination: paginationData })),
    [dispatch]
  );

  // Debounce typing so the API is only hit once the user pauses; a new search starts from page 1
  useEffect(() => {
    const timer = setTimeout(() => {
      const search = searchInput.trim();
      setQuery((prev) => (prev.search === search ? prev : { ...prev, search, page: 1 }));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Empty filters are dropped by the service, so no filters returns all appointments
  useEffect(() => {
    const requestId = ++latestRequest.current;
    setLoading(true);

    getAnalytics({ ...query, limit: PER_PAGE })
      .then((res) => {
        if (requestId !== latestRequest.current) return;
        if (res?.success) {
          setData(res.data.data, res.data.pagination);
          setPagination(res.data.pagination ?? initialPagination);
        } else {
          setData([], initialPagination);
          setPagination(initialPagination);
        }
      })
      .catch(() => {
        if (requestId !== latestRequest.current) return;
        setData([], initialPagination);
        setPagination(initialPagination);
      })
      .finally(() => {
        if (requestId !== latestRequest.current) return;
        setLoading(false);
        setInitialLoad(false);
      });
  }, [query, setData]);

  const handlePageChange = (page: number) => {
    setQuery((prev) => ({ ...prev, page }));
  };

  // Clear the applied search right away instead of waiting for the debounce
  const clearSearch = () => {
    setSearchInput('');
    setQuery((prev) => (prev.search ? { ...prev, search: '', page: 1 } : prev));
  };

  const clearDate = () => {
    setQuery((prev) => (prev.date ? { ...prev, date: '', page: 1 } : prev));
  };

  const clearFilters = () => {
    setSearchInput('');
    setQuery(initialQuery);
  };

  const hasFilters = !!(searchInput.trim() || query.date);
  const searching = loading || searchInput.trim() !== query.search;
  const isEmpty = !initialLoad && !pagination?.totalItems;

  return (
    <>
      <Header
        search={searchInput}
        onSearch={(e) => setSearchInput(e.target.value)}
        onClearSearch={clearSearch}
        loading={searching}
        date={query.date}
        onDateChange={(e) => {
          const date = e.target.value;
          setQuery((prev) => ({ ...prev, date, page: 1 }));
        }}
        onClearDate={clearDate}
      />
      <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">

        <div className="relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
              <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            </div>
          )}
          <ClientTable heads={heads}>
            {initialLoad ? (
              <></>
            ) : isEmpty ? (
              <tr>
                <td colSpan={heads.length} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-sm font-medium text-gray-500">
                    {hasFilters ? 'No appointments match your filters.' : 'No appointments found.'}
                    {hasFilters && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="theme-text-color font-semibold hover:underline"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              <RenderTable />
            )}
          </ClientTable>
        </div>
        {/* Pagination Controls */}
        {!initialLoad && !isEmpty && (
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={loading || !pagination?.hasPrevPage}
                className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 flex items-center justify-center"
              >
                <FaArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <span className="text-gray-700 font-medium">
                Page {pagination?.currentPage} of {pagination?.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={loading || !pagination?.hasNextPage}
                className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 flex items-center justify-center"
              >
                <FaArrowRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;

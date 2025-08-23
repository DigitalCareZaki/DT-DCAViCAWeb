'use client';

import { useDispatch, useSelector } from 'react-redux';
import { ClientTable } from '@common';
import RenderTable from './RenderTable';
import getTablets from 'service/tablets/getTablets';
import getAllTabletsForPatient from 'service/tablets/getAllTabletsForPatient';
import { setTablets } from 'store/tablets.slice';
import { useEffect, useState, useRef } from 'react';
import type { ReduxProps } from 'store/types';
import type { TabletProps } from 'types/data';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

interface TableProps {
  userRole: string;
  patient?: string | null;
}

const Table = ({ userRole, patient }: TableProps) => {
  const dispatch = useDispatch();
  const tablets = useSelector((state: ReduxProps) => state.tablets.tablets);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    perPage: 10,
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
    prevPage: null,
  });

  useEffect(() => {
    async function fetchTablets() {
      let res;
      if (patient) {
        res = await getAllTabletsForPatient(patient);
        if (res.success) {
          dispatch(setTablets(res.data ?? []));
          setPagination({
            totalItems: res.data?.length ?? 0,
            perPage: res.data?.length ?? 0,
            currentPage: 1,
            totalPages: 1,
            hasNextPage: false,
            hasPrevPage: false,
            nextPage: null,
            prevPage: null,
          });
        }
      } else {
        res = await getTablets(page, pagination.perPage);
        if (res.success) {
          dispatch(setTablets(res.data ?? []));
          setPagination(res.pagination ?? pagination);
        }
      }
    }
    fetchTablets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, patient, page]);

  return (
    <div className="flex h-full w-full flex-col items-end gap-4">

      <div className="relative w-full pb-12 shadow-md sm:rounded-lg">

        <ClientTable
          heads={[
            'Title',
            'Serial',
            // 'Category',
            'Added By',
            'Status',
            'Added At',
            'Action',
          ]}
        >
          <RenderTable userRole={userRole} data={tablets} />
        </ClientTable>
        {!patient && (
          <div className="flex items-center justify-center gap-4 py-6">
            <button
              disabled={!pagination.hasPrevPage}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 border rounded disabled:opacity-50"

            >
              <FaArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((p) => p + 1)}
              className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
            >
              <FaArrowRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;

'use client';

import { useDispatch, useSelector } from 'react-redux';
import { ClientTable } from '@common';
import RenderTable from './RenderTable';
import type { ReduxProps } from 'store/types';
import getDevices from 'service/device/getDevices';
import getAllDevicesForPatient from 'service/device/getAllDevicesForPatient';
import { setDevices } from 'store/devices.slice';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
interface TableProps {
  userRole: string;
  patient?: string | null;
}

const Table = ({ userRole, patient }: TableProps) => {
  const dispatch = useDispatch();
  const devices = useSelector((state: ReduxProps) => state.devices.devices);
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
    async function fetchDevices() {
      let res;
      if (patient) {
        res = await getAllDevicesForPatient(patient);
        if (res.success) {
          dispatch(setDevices(res.data ?? []));
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
        res = await getDevices(page, pagination.perPage);
        console.log('res >>>>>>', res);
        if (res.success) {
          dispatch(setDevices(res.data ?? []));
          setPagination(res.pagination ?? pagination);
        }
      }
    }
    fetchDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, patient, page]);

  return (
    <div className="flex h-full w-full flex-col items-end gap-4">
      <div className="relative w-full pb-12 shadow-md sm:rounded-lg">
        <ClientTable
          heads={[
            'Title',
            'Serial',
            'Description',
            'Category',
            'Added By',
            'Branch',
            'Status',
            'Added On',
            'Action',
          ]}
        >
          <RenderTable userRole={userRole} data={devices} />
        </ClientTable>
        {!patient && (
          <div className="flex items-center justify-center gap-4 py-6">
            <button
              disabled={!pagination.hasPrevPage}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
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

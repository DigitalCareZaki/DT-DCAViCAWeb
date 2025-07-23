'use client';
import React, { useState, useEffect } from 'react'
import Header from './Header';
import Table from './Table';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { PageInfo } from '@common';
import { getLogs } from '@service';

import type { LogsDataProps, ServerComponent } from '@types';

const Logs = () => {

  const [data, setData] = useState<LogsDataProps[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const res = await getLogs(page, limit);
      if (res.success) {
        setData(res.data.data ?? []);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.error('Error loading logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [page]);

  return (
    <div className="h-screen pb-96 font-poppins">
      <div className="flex w-full justify-between">
        <span className="screen-title">Logs</span>
      </div>
      {/* <PageInfo /> */}
      <Header data={data} />
      <Table data={data ?? []} />
      {pagination && (
        <div className="flex items-center justify-center gap-4 py-7">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={!pagination.hasPrevPage}
            className="rounded-full bg-gray-200 px-3 py-1 disabled:opacity-50"
          >
            <FaArrowLeft className="w-5 h-5 text-gray-700 " />
          </button>

          <span className="text-sm">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button
            onClick={() => setPage(p => Math.min(p + 1, pagination.totalPages))}
            disabled={!pagination.hasNextPage}
            className="rounded-full bg-gray-200 px-3 py-1 disabled:opacity-50"
          >
            <FaArrowRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Logs;

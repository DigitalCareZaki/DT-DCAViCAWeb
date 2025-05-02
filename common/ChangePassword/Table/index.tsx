'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

import TableRender from './Table';

import type { ClientComponentProps } from '@types';
import { changePasswordRecordsSlice } from '@slice';
import type { TableProps } from './types';
import { getPasswordLists } from '@service';

const Table: ClientComponentProps<any> = ({ changepasswordData }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);


  console.log('check changepasswordData >>>>', changepasswordData);


  const fetchPasswords = async (pageNumber: number) => {
    setLoading(true); // ✅ start loader
    const response = await getPasswordLists(pageNumber, 10);
    if (response.success) {
      setLoading(false); // ✅ stop loader
      const changepasswordData = response?.data?.data?.filter((item: any) => item.type === 'PASSWORD');
      dispatch(changePasswordRecordsSlice({ passwords: changepasswordData }));
      setHasNextPage(response.data.pagination?.hasNextPage);
    }
  };

  useEffect(() => {
    fetchPasswords(page);
  }, [page]);

  const handleNext = () => {
    if (hasNextPage) setPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  useEffect(() => {
    if (!changepasswordData?.length) return;
    console.log('inside the useEffect >>>>', changepasswordData);
    dispatch(changePasswordRecordsSlice({ passwords: changepasswordData }));
  }, [changepasswordData]);

  return (
    <div className="h-full w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      {!loading ? <TableRender /> : <></>}

      {!loading && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={page === 1 || loading}
            className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 flex items-center justify-center"
          >
            <FaArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <span>Page 1 of {page}</span>
          <button
            onClick={handleNext}
            disabled={!hasNextPage || loading}
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

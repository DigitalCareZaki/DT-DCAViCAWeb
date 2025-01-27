'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setEmrRecordsSlice } from '@slice';

import TableRender from './Table';

import type { ClientComponentProps } from '@types';
import type { TableProps } from './types';

const Table: ClientComponentProps<TableProps> = ({ records }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!records?.length) return;

    dispatch(setEmrRecordsSlice({ records }));
  }, [records]);

  return (
    <div className="h-full w-full">
      <TableRender />
    </div>
  );
};

export default Table;

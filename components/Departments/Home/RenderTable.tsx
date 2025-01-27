'use client';

import { useSelector } from 'react-redux';

import { ClientGenerator } from '@common';
import Row from './Row';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreDepartmentState } from '@store-types';

const RenderTable: ClientComponent = () => {
  const { departments } = useSelector<ReduxProps, StoreDepartmentState>(
    (state) => state.departments
  );

  return (
    <ClientGenerator data={departments}>
      <Row />
    </ClientGenerator>
  );
};

export default RenderTable;

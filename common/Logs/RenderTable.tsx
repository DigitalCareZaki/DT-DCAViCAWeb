'use client';

import { useSelector } from 'react-redux';

import { ClientGenerator } from '@common';
import Row from './Row';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreLogsState } from '@store-types';

const RenderTable: ClientComponent = () => {
  const { logs } = useSelector<ReduxProps, StoreLogsState>(
    (state) => state.logs
  );

  return (
    <ClientGenerator data={logs ?? []}>
      <Row />
    </ClientGenerator>
  );
};

export default RenderTable;

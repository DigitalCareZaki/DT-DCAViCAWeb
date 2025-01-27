'use client';

import { useSelector } from 'react-redux';

import Row from '../Row';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreTelemedState } from '@store-types';

const RenderTable: ClientComponent = () => {
  const { appointmentsListings } = useSelector<ReduxProps, StoreTelemedState>(
    (state) => state.telemed
  );

  return (
    <>
      {appointmentsListings.map((el) => (
        <Row key={el.id} {...el} />
      ))}
    </>
  );
};

export default RenderTable;

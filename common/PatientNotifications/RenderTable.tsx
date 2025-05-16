import { useSelector } from 'react-redux';

import { ClientGenerator } from '@common';
import Row from './Row';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreNotificationProps } from '@store-types';

const RenderTable: ClientComponent = () => {
  const { notifications } = useSelector<ReduxProps, StoreNotificationProps>(
    (state) => state.notifications
  );

  return (
    <ClientGenerator data={notifications ?? []}>
      <Row />
    </ClientGenerator>
  );
};

export default RenderTable;

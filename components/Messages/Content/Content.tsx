'use client';

import { useSelector } from 'react-redux';

import NoContentSelected from './NoContent';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreGlobalState } from '@store-types';

const Content: ClientComponent = () => {
  const { message } = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );

  if (!message.show) return <NoContentSelected />;

  return (
    <div className="flex h-[85%] w-full flex-col gap-10 p-10 py-5">
      <div>
        <span className="text-xl font-bold text-gray-500">
          {message.data?.subject}
        </span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: message.data?.content ?? '' }}
        className="h-full w-full"
      />
    </div>
  );
};

export default Content;

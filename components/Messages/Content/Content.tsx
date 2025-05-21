'use client';

import { useSelector } from 'react-redux';

import NoContentSelected from './NoContent';
import Image from 'next/image';
import type { ClientComponent } from '@types';
import type { ReduxProps, StoreGlobalState } from '@store-types';
import { getProfilePicture, getName } from '@init-globals';

const Content: ClientComponent = () => {
  const { message } = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );


  console.log('is msg ma kia a raha han message >>>>>', message);


  if (!message.show) return <NoContentSelected />;

  // Ensure mainMessage is always an array
  const mainMessageArray = Array.isArray(message.data) ? message.data : [message.data];
  console.log('mainMessageArray >>>>>', mainMessageArray);



  return (
    <div className="flex h-[85%] w-full flex-col gap-6 overflow-y-auto p-6 bg-white">
      {mainMessageArray.map((item: any, i: number) =>
        item?.threadMessages?.map((msg: any, index: number) => (
          <div
            key={`${i}-${index}`}
            className="rounded-md border border-gray-200 bg-white shadow-sm"
          >
            {/* Header */}
            <div className="flex w-full items-center justify-between border-b px-6 py-4">
              <div className="flex gap-2">
                <div className="relative h-10 w-10 rounded-full">
                  <Image
                    src={getProfilePicture(msg.sender.uri)}
                    alt="profile picture"
                    fill
                    className="h-full w-full rounded-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800">
                    {getName({
                      first_name: msg.sender.first_name ?? '',
                      middle_name: msg.sender.middle_name ?? '',
                      last_name: msg.sender.last_name ?? '',
                    })}
                  </span>
                  <span className="text-xs text-gray-500">{msg.sender.email}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">
                  {new Date(msg.created_at).toDateString()}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Subject */}
            {msg.subject && (
              <div className="px-6 pt-2 text-base font-semibold text-gray-700">
                {msg.subject}
              </div>
            )}

            {/* Body */}
            <div
              className="prose max-w-full px-6 pb-6 pt-2 text-sm text-gray-800"
              dangerouslySetInnerHTML={{ __html: msg.content ?? '' }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Content;

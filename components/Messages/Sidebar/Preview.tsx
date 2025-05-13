'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getName, getProfilePicture } from '@init-globals';
import { selectMessageReducer } from '@slice';
import type { ClientComponentProps } from '@types';
import type { PreviewProps } from './types';

const Preview: ClientComponentProps<any> = ({ ...data }) => {
  const dispatch = useDispatch();

  const onClick = () =>
    dispatch(
      selectMessageReducer({
        ...(data as any),
      })
    );

  const [dateTimeString, setDateTimeString] = useState<string>('');

  useEffect(() => {
    if (data?.created_at) {
      const dateObj = new Date(data.created_at);

      const time = dateObj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      const date = dateObj.toDateString(); // e.g., Tue Apr 22 2025

      setDateTimeString(`${date} ${time}`);
    }
  }, [data?.created_at]);

  return (
    <div className="relative flex w-full flex-col border-b py-3">
      <div
        onClick={onClick}
        className="flex w-full cursor-pointer gap-2 rounded-lg p-2 transition duration-300 doctor:hover:bg-blue-50 patient:hover:bg-rose-50"
      >
        <div className="relative h-10 w-10 shrink-0 rounded-full">
          <Image
            src={getProfilePicture(data.sender?.uri)}
            alt="profile-picture"
            fill
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full items-center justify-between">
            <span
              title={getName({
                first_name: data.sender?.first_name ?? '',
                middle_name: data.sender?.middle_name ?? '',
                last_name: data.sender?.last_name ?? '',
              })}
              className="w-[60%] truncate text-ellipsis text-xs font-semibold text-gray-500"
            >
              {getName({
                first_name: data.sender?.first_name ?? '',
                middle_name: data.sender?.middle_name ?? '',
                last_name: data.sender?.last_name ?? '',
              })}
            </span>
            <span className="w-[60%] truncate text-ellipsis text-[10px] font-semibold text-gray-400">
              {dateTimeString}
            </span>
          </div>
          <div className="flex w-full">
            <span className="text-sm font-bold text-gray-600">
              {data.subject?.slice(0, 30)}
            </span>
          </div>
          <div className="flex w-full">
            <span className="text-xs text-gray-500">
              {data.content?.trimHTML()?.slice(0, 60)}
              {(data.content?.length ?? 0) > 60 ? '..' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;

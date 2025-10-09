'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getName, getProfilePicture } from '@init-globals';
import { selectMessageReducer, setInboxReducer } from '@slice';
import { useSelector } from 'react-redux';
import type { ReduxProps, StoreGlobalState } from '@store-types';
import type { ClientComponentProps } from '@types';
import type { PreviewProps } from './types';
import { getThreadMessages } from '@service';
import readMessage from '../../../service/messages/readMessage';
import readThread from '../../../service/messages/readThread';
import getInbox from '../../../service/messages/getInbox';
import { FaCircle } from 'react-icons/fa';
// no manual message emits here; backend pushes inbox_update

const Preview: ClientComponentProps<any> = ({ ...data }) => {
  const dispatch = useDispatch();
  const { inbox } = useSelector<ReduxProps, StoreGlobalState>((state) => state.global);
  const [isRead, setIsRead] = useState(data.is_read);
  const [dateTimeString, setDateTimeString] = useState<string>('');

  const onClick = async () => {
    // Show skeleton loader in Content
    dispatch(selectMessageReducer({ ...data, threadMessages: [], loading: true }));

    // Mark as read if needed
    if (data.root_id === null && isRead === false && data.id) {
      await readMessage(data.id);
      setIsRead(true);
      // Optimistically update only this item in Redux inbox
      if (Array.isArray(inbox)) {
        const updated = inbox.map((item: any) =>
          item.id === data.id ? { ...item, is_read: true } : item
        );
        dispatch(setInboxReducer(updated));
      }
    }

    if (data.root_id !== null && isRead === false && data.root_id) {
      await readThread(data.root_id);
      setIsRead(true);
      if (Array.isArray(inbox)) {
        const updated = inbox.map((item: any) =>
          item.root_id === data.root_id || item.id === data.id
            ? { ...item, is_read: true }
            : item
        );
        dispatch(setInboxReducer(updated));
      }
    }

    // Fetch thread messages in the background
    getThreadMessages(data?.id).then((response) => {
      if (response.success) {
        dispatch(selectMessageReducer({ ...data, threadMessages: response.data, loading: false }));
      } else {
        dispatch(selectMessageReducer({ ...data, threadMessages: [], loading: false }));
      }
    });
  };



  // Keep local isRead in sync with latest inbox data from Redux
  useEffect(() => {
    setIsRead(data.is_read);
  }, [data.is_read]);

  // useEffect(() => {
  //   if (data?.created_at) {
  //     const dateObj = new Date(data.created_at);

  //     const time = dateObj.toLocaleTimeString([], {
  //       hour: '2-digit',
  //       minute: '2-digit',
  //       hour12: true,
  //     });

  //     const date = dateObj.toDateString(); // e.g., Tue Apr 22 2025

  //     setDateTimeString(`${date} ${time}`);
  //   }
  // }, [data?.created_at]);

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
              className="w-[60%] truncate text-ellipsis text-sm font-semibold text-gray-700"
            >
              {getName({
                first_name: data.sender?.first_name ?? '',
                middle_name: data.sender?.middle_name ?? '',
                last_name: data.sender?.last_name ?? '',
              })}
            </span>
            <span className="w-[60%] truncate text-ellipsis text-xs font-semibold text-gray-500">
              {dateTimeString}
            </span>
            {/* NEW/UNREAD INDICATOR */}
            {data.root_id === null && isRead === false && (
              <span
                title="New message"
                className="ml-2 px-2 py-0.5 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-sm"
              >
                New
              </span>
            )}
            {data.root_id !== null && isRead === false && (
              <span
                title="New message"
                className="inline-block ml-2 px-2 py-0.5 text-sm font-medium text-white bg-green-600 rounded-full whitespace-nowrap"
              >
                New Replies
              </span>
              // <span title="Unread replies" className="ml-2 text-xs text-red-500 font-bold">
              //   <FaCircle size={8} className="text-red-500" />
              // </span>
            )}
            {/* {data.root_id !== null && data.replies.filter((r: any) => !r.is_read).length > 0 && (
              <span title="Unread replies" className="ml-2 text-xs text-red-500 font-bold">
                <FaCircle size={8} className="text-red-500" />
              </span>
            )} */}
          </div>
          <div className="flex w-full">
            <span className="text-base font-bold text-gray-700">
              {data.subject ? data.subject.slice(0, 30) : <span className="italic text-gray-400">(No Subject)</span>}
            </span>
          </div>
          <div className="flex w-full">
            <span className="text-sm text-gray-600">
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

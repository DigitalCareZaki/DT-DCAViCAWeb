'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FiEdit } from '@react-icons/all-files/fi/FiEdit';

import { setRoomsReducer } from '@slice';

import RenderMessages from './RenderMessages';
import Search from './Search';

import type { ClientComponentProps } from '@types';
import type { MessagesProps } from './types';

const Messages: ClientComponentProps<MessagesProps> = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRoomsReducer({ rooms: data ?? [] }));
  }, [data]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Messages</span>
            <div className="theme-bg-color flex h-6 w-6 items-center justify-center rounded-full text-white">
              <span className="mt-[1px] text-ssx font-semibold">
                +{data.length}
              </span>
            </div>
          </div>
          <FiEdit className="theme-text-color cursor-pointer transition duration-300 hover:scale-[105%]" />
        </div>
        <Search />
      </div>
      <RenderMessages />
    </div>
  );
};

export default Messages;
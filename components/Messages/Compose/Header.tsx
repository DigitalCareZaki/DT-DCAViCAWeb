'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';

import { useUser } from '@selectors';
import { getName, getProfilePicture } from '@init-globals';
import { Icon } from '@common';
import { toggleComposeMessageReducer, composeEmailReducer } from '@slice';

import type { ClientComponent } from '@types';

const Header: ClientComponent = () => {
  const dispatch = useDispatch();
  const [user] = useUser();

  const closeModal = () => {
    dispatch(
      composeEmailReducer({
        to: '',
        subject: '',
        content: '',
        parent_id: '',
        attachments: [],
      })
    );
    dispatch(toggleComposeMessageReducer());
  };

  return (
    <div className="flex w-full flex-col gap-4 text-gray-500">
      <div className="flex w-full items-center justify-between">
        <span className="text-base font-bold">New mail</span>
        <div
          onClick={closeModal}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition duration-300 hover:scale-105"
        >
          <Icon name="IoClose" size={16} />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 rounded-lg bg-gray-100 p-2">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 rounded-full bg-gray-400">
            <Image
              src={getProfilePicture(user.uri)}
              alt="profile picutre"
              className="h-full w-full rounded-full object-cover"
              fill
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {getName({
                first_name: user.first_name ?? '',
                last_name: user.last_name ?? '',
                middle_name: user.middle_name ?? '',
              })}
            </span>
            <span className="text-xs font-medium">{user.email}</span>
          </div>
        </div>
        <div className="theme-text-color w-fit rounded-full px-6 py-1 text-xs font-semibold doctor:bg-blue-200 patient:bg-rose-200">
          <span>You</span>
        </div>
      </div>
      <div className="w-full border-b" />
    </div>
  );
};

export default Header;

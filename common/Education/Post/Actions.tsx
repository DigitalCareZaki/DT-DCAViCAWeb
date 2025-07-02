'use client';

import { useCallback, useEffect, useState } from 'react';
import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import { IoDownload } from '@react-icons/all-files/io5/IoDownload';

import { PrimaryCounter } from '@common';
import { useUser } from '@selectors';
import { imageExtension } from '@constants';

import type { ActionsProps } from './types';
import type { ClientComponentProps } from '@types';

const Actions: ClientComponentProps<ActionsProps> = ({ ...data }) => {
  const [user] = useUser();
  const [states, setStates] = useState({
    like: false,
  });

  const handleState = (type: 'like') => () => {
    setStates((prev) => ({ ...prev, [type]: true }));
  };

  useEffect(() => {
    if (!states.like) return;

    (async () => {
      const headers = new Headers();
      headers.set('Authorization', `Bearer ${user.token}`);

      try {
        await fetch(`/api/v1/web/education/like/${data.id}`, {
          method: 'GET',
          headers,
        });
      } catch (err) { }
    })();
  }, [data.id, states.like, user]);

  const handleDownload = useCallback(() => {
    if (data.uri) {
      const link = document.createElement('a');
      link.href = data.uri;
      link.download = data.uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [data.uri]);

  return (
    <div className="flex w-full items-center justify-center gap-4 border-t px-[10%] pt-5">
      <button
        onClick={handleState('like')}
        title="Like"
        className="hover:theme-bg-color flex h-10 w-20 items-center justify-center rounded-lg bg-[#f8f9fa] text-gray-400 outline-none transition duration-200 hover:text-white"
      >
        {states.like ? (
          <PrimaryCounter value={data.likes + 1} prefix={''} />
        ) : (
          <FaHeart size={20} />
        )}
      </button>
      {!imageExtension.includes(data.file) && (
        <button
          onClick={handleDownload}
          title="Download"
          className="hover:theme-bg-color flex h-10 w-20 items-center justify-center rounded-lg bg-[#f8f9fa] text-gray-400 outline-none transition duration-200 hover:text-white"
        >
          <IoDownload size={20} />
        </button>
      )}
    </div>
  );
};

export default Actions;

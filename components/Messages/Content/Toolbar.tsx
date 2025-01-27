'use client';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaRegStar } from '@react-icons/all-files/fa/FaRegStar';
import { FaStar } from '@react-icons/all-files/fa/FaStar';
import { FaPrint } from '@react-icons/all-files/fa/FaPrint';
import { BiReply } from '@react-icons/all-files/bi/BiReply';
import { RiDeleteBin6Line } from '@react-icons/all-files/ri/RiDeleteBin6Line';
import { MdDelete } from '@react-icons/all-files/md/MdDelete';

import Action from './Action';
import {
  updateMessageReducer,
  toggleComposeMessageReducer,
  composeEmailReducer,
} from '@slice';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreGlobalState } from '@store-types';

const Toolbar: ClientComponent = () => {
  const dispatch = useDispatch();

  const { message } = useSelector<ReduxProps, StoreGlobalState>(
    (state) => state.global
  );

  const onSuccessStarred = useCallback(() => {
    dispatch(
      updateMessageReducer({
        ...(message.data as any),
        starred: !message.data?.starred,
      })
    );
  }, [dispatch, message.data]);

  const onSuccessDeleted = useCallback(() => {
    dispatch(updateMessageReducer({ ...(message.data as any), deleted: true }));
  }, [dispatch, message.data]);

  const handleReply = useCallback(() => {
    dispatch(
      composeEmailReducer({
        to: message.data?.sender.email,
        subject: `Reply: ${message.data?.subject}`,
      })
    );
    dispatch(toggleComposeMessageReducer());
  }, [dispatch, message?.data]);

  const handleForward = useCallback(() => {
    dispatch(
      composeEmailReducer({
        to: '',
        subject: `Fwd: ${message.data?.subject}`,
        content: message.data?.content,
      })
    );
    dispatch(toggleComposeMessageReducer());
  }, [dispatch, message?.data]);

  if (!message.show)
    return (
      <div className="flex h-12 w-full shrink-0 items-center justify-between rounded-lg bg-white px-4 py-4"></div>
    );

  return (
    <div className="flex h-12 w-full shrink-0 items-center justify-between rounded-lg bg-gray-100 px-4 py-4">
      <div className="flex items-center justify-between gap-4 py-2">
        <div
          onClick={handleReply}
          className="flex cursor-pointer items-center gap-2 rounded-lg p-2 font-medium text-gray-500 transition duration-300 hover:bg-gray-200"
        >
          <BiReply size={20} />
          <span>Reply</span>
        </div>
        <div
          onClick={handleForward}
          className="flex cursor-pointer items-center gap-2 rounded-lg p-2 font-medium text-gray-500 transition duration-300 hover:bg-gray-200"
        >
          <BiReply size={20} className="rotate-180" />
          <span>Forward</span>
        </div>
        <div className="flex cursor-pointer items-center gap-2 rounded-lg p-2 font-medium text-gray-500 transition duration-300 hover:bg-gray-200">
          <FaPrint size={20} />
          <span>Print</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 py-2">
        <Action
          label="Starred"
          actionType={message.data?.starred ? 'unstarred' : 'starred'}
          icon={<FaRegStar size={20} />}
          messageId={message.data?.id ?? ''}
          active={message.data?.starred}
          activeIcon={<FaStar size={20} />}
          onSuccess={onSuccessStarred}
        />
        <Action
          label="Delete"
          actionType="delete"
          icon={<RiDeleteBin6Line size={20} />}
          messageId={message.data?.id ?? ''}
          active={message.data?.deleted}
          activeIcon={<MdDelete size={20} />}
          onSuccess={onSuccessDeleted}
          disableOnActive
        />
      </div>
    </div>
  );
};

export default Toolbar;

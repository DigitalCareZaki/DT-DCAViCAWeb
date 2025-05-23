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

  const messages = message.data?.threadMessages || [];
  const rootMessage = messages[0];



  const onSuccessStarred = useCallback(() => {
    dispatch(
      updateMessageReducer({
        ...(message.data as any),
        starred: rootMessage?.starred,
      })
    );
  }, [dispatch, message.data]);

  const onSuccessDeleted = useCallback(() => {
    dispatch(updateMessageReducer({ ...(message.data as any), deleted: true }));
  }, [dispatch, message.data]);

  const handleReply = useCallback(() => {
    console.log('rootMessage >>>>>', rootMessage);
    dispatch(
      composeEmailReducer({
        to: rootMessage?.sender.email,
        parent_id: rootMessage?.id,
        // subject: `Reply: ${rootMessage?.subject}`,
      })
    );
    dispatch(toggleComposeMessageReducer());
  }, [dispatch, message?.data]);

  const handleForward = useCallback(() => {
    dispatch(
      composeEmailReducer({
        to: '',
        subject: `Fwd: ${rootMessage?.subject}`,
        content: rootMessage?.content,
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
          actionType={rootMessage?.starred ? 'unstarred' : 'starred'}
          icon={<FaRegStar size={20} />}
          messageId={rootMessage?.id ?? ''}
          active={rootMessage?.starred}
          activeIcon={<FaStar size={20} />}
          onSuccess={onSuccessStarred}
        />
        <Action
          label="Delete"
          actionType="delete"
          icon={<RiDeleteBin6Line size={20} />}
          messageId={rootMessage?.id ?? ''}
          active={rootMessage?.deleted}
          activeIcon={<MdDelete size={20} />}
          onSuccess={onSuccessDeleted}
          disableOnActive
        />
      </div>
    </div>
  );
};

export default Toolbar;

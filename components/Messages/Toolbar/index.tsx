'use client';

import { useDispatch } from 'react-redux';
import Link from 'next/link';

import { MdInbox } from '@react-icons/all-files/md/MdInbox';
import { FaRegStar } from '@react-icons/all-files/fa/FaRegStar';
import { AiOutlineSend } from '@react-icons/all-files/ai/AiOutlineSend';
import { BiMessageSquareEdit } from '@react-icons/all-files/bi/BiMessageSquareEdit';

import { toggleComposeMessageReducer } from '@slice';
import { useUser } from '@selectors';

import Tab from './Tab';

import type { ClientComponent } from '@types';

const Toolbar: ClientComponent = () => {
  const dispatch = useDispatch();
  const [user] = useUser();

  const showComposeModal = () => dispatch(toggleComposeMessageReducer());

  return (
    <div className="flex h-[95%] w-[5%] flex-col items-center gap-4 rounded-l-lg border-r bg-white p-10">
      <Tab onClick={showComposeModal} title="Compose">
        <BiMessageSquareEdit />
      </Tab>

      <Link passHref href={`/${user.role?.toLowerCase()}/messages`}>
        <Tab title="Inbox">
          <MdInbox />
        </Tab>
      </Link>

      <Link passHref href={`/${user.role?.toLowerCase()}/messages/starred`}>
        <Tab title="Starred">
          <FaRegStar />
        </Tab>
      </Link>
      <Link passHref href={`/${user.role?.toLowerCase()}/messages/sent`}>
        <Tab title="Sent">
          <AiOutlineSend />
        </Tab>
      </Link>
    </div>
  );
};

export default Toolbar;

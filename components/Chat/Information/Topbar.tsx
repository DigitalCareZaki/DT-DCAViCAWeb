'use server';

import Link from 'next/link';

import { BsChatFill } from '@react-icons/all-files/bs/BsChatFill';
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';

import type { ServerComponent } from '@types';

const Topbar: ServerComponent = async () => {
  return (
    <div className="flex w-full items-center justify-between border-b border-gray-main/40 pb-6 pt-2">
      <div className="flex items-center gap-4 text-sx text-white/80">
        <BsChatFill size={20} className="text-white" />
        <span>Chat Details</span>
      </div>
      <Link passHref href="/">
        <div className="hover:theme-bg-color flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-dark-main text-sx text-white transition duration-300">
          <IoMdClose />
        </div>
      </Link>
    </div>
  );
};

export default Topbar;

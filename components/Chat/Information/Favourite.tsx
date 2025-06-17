'use server';

import { FaStar } from '@react-icons/all-files/fa/FaStar';
import { BsChatFill } from '@react-icons/all-files/bs/BsChatFill';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';
import { FaImage } from '@react-icons/all-files/fa/FaImage';

import type { ServerComponent } from '@types';

const Favourite: ServerComponent = async () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-2 text-xs text-white/80">
        <FaStar size={20} className="text-white" />
        <span>Favourite</span>
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-4 text-xs text-white/80">
        <div className="flex items-center gap-2">
          <div className="theme-bg-color flex h-14 w-14 items-center justify-center rounded-lg text-white">
            <BsChatFill size={20} />
          </div>
          <div className="flex flex-col">
            <span>Conversation</span>
            <span className="text-ssx text-gray-main">Total 10</span>
          </div>
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-dark-main">
          <IoIosArrowForward />
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-4 text-xs text-white/80">
        <div className="flex items-center gap-2">
          <div className="theme-bg-color flex h-14 w-14 items-center justify-center rounded-lg text-white">
            <FaImage size={20} />
          </div>
          <div className="flex flex-col">
            <span>Images</span>
            <span className="text-ssx text-gray-main">Total 1</span>
          </div>
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-dark-main">
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
};

export default Favourite;
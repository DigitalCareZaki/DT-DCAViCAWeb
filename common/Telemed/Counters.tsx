'use server';

import { IoCheckmarkDoneSharp } from '@react-icons/all-files/io5/IoCheckmarkDoneSharp';
import { IoIosCloseCircle } from '@react-icons/all-files/io/IoIosCloseCircle';
import { IoInfiniteSharp } from '@react-icons/all-files/io5/IoInfiniteSharp';
import { IoMdTime as MdAccessTimeFilled } from '@react-icons/all-files/io/IoMdTime';

import { PrimaryCounter } from '../Counter';

import type { ServerComponent } from '@types';

const Counter: ServerComponent = async () => {
  return (
    <div className="flex w-full items-center gap-10">
      <div className="flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold">
        <div
          title="Total Appointments"
          className="theme-div flex items-center gap-2 rounded-md px-2 py-1 doctor:text-white nurse:text-white"
        >
          <>
            <IoInfiniteSharp />
            <span>
              <PrimaryCounter prefix="" value={1200} />
            </span>
          </>
        </div>
        <div
          title="Scheduled Appointments"
          className="theme-div flex items-center gap-2 rounded-md px-2 py-1 doctor:text-white nurse:text-white"
        >
          <>
            <MdAccessTimeFilled />
            <span>
              <PrimaryCounter prefix="" value={243} />
            </span>
          </>
        </div>
        <div
          title="Completed Appointments"
          className="theme-div flex items-center gap-2 rounded-md px-2 py-1 doctor:text-white nurse:text-white"
        >
          <>
            <IoCheckmarkDoneSharp />
            <span>
              <PrimaryCounter prefix="" value={890} />
            </span>
          </>
        </div>
        <div
          title="Cancelled Appointments"
          className="theme-div flex items-center gap-2 rounded-md px-2 py-1 doctor:text-white nurse:text-white"
        >
          <>
            <IoIosCloseCircle />
            <span>
              <PrimaryCounter prefix="" value={136} />
            </span>
          </>
        </div>
      </div>
    </div>
  );
};

export default Counter;

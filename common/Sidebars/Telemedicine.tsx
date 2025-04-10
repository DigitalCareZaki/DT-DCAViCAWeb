'use client';

import Link from 'next/link';

import { RiUserSmileLine } from '@react-icons/all-files/ri/RiUserSmileLine';
import { RiHomeSmileLine } from '@react-icons/all-files/ri/RiHomeSmileLine';
import { AiFillAppstore as LuLayoutDashboard } from '@react-icons/all-files/ai/AiFillAppstore';
import { CgCalendar as LuCalendarRange } from '@react-icons/all-files/cg/CgCalendar';
import { IoIosAnalytics as TbReportAnalytics } from '@react-icons/all-files/io/IoIosAnalytics';
import { MdNotifications as MdOutlineNotifications } from '@react-icons/all-files/md/MdNotifications';
import { FaCog as LiaCogSolid } from '@react-icons/all-files/fa/FaCog';

import { TooltipBasic } from '@common';

import type { ClientComponentProps } from '@types';
import type { TelemedSidebarProps } from './types';

const Telemedicine: ClientComponentProps<TelemedSidebarProps> = ({
  userType,
}) => {
  return (
    <div className=" flex h-full w-[5%] flex-col items-center gap-4 rounded-2xl bg-white py-10">
      <Link passHref href={`/${userType?.toLowerCase()}/telemed`}>
        <TooltipBasic
          title="Dashboard"
          className="left-20 top-2 flex items-center justify-center bg-fuchsia-200 text-fuchsia-500"
        >
          <div className="cursor-pointer rounded-lg bg-background p-4 transition duration-300 hover:bg-fuchsia-500 hover:text-white">
            <LuLayoutDashboard size={20} />
          </div>
        </TooltipBasic>
      </Link>
      <Link passHref href={`/${userType?.toLowerCase()}/telemed/meetings`}>
        <TooltipBasic
          title="Appointments"
          className="left-20 top-2 flex items-center justify-center bg-fuchsia-200 text-fuchsia-500"
        >
          <div className="cursor-pointer rounded-lg bg-background p-4 transition duration-300 hover:bg-fuchsia-500 hover:text-white">
            <LuCalendarRange size={20} />
          </div>
        </TooltipBasic>
      </Link>
      {/* <TooltipBasic
        title="Reports"
        className="left-20 top-2 flex items-center justify-center bg-fuchsia-200 text-fuchsia-500"
      >
        <div className="cursor-pointer rounded-lg bg-background p-4 transition duration-300 hover:bg-fuchsia-500 hover:text-white">
          <TbReportAnalytics size={20} />
        </div>
      </TooltipBasic> */}

      <Link passHref href={`/${userType?.toLowerCase()}/telemed/analytics`}>
        <TooltipBasic
          title="Analytics"
          className="left-20 top-2 flex items-center justify-center bg-fuchsia-200 text-fuchsia-500"
        >
          <div className="cursor-pointer rounded-lg bg-background p-4 transition duration-300 hover:bg-fuchsia-500 hover:text-white">
            <RiUserSmileLine size={20} />
          </div>
        </TooltipBasic>
      </Link>
      <div className="h-[1px] w-full rounded-full bg-gray-200" />
      {/* <TooltipBasic
        title="Notifications"
        className="left-20 top-2 flex items-center justify-center bg-fuchsia-200 text-fuchsia-500"
      >
        <div className="cursor-pointer rounded-lg bg-background p-4 transition duration-300 hover:bg-fuchsia-500 hover:text-white">
          <MdOutlineNotifications size={20} />
        </div>
      </TooltipBasic> */}
      <Link passHref href={`/${userType?.toLowerCase()}/telemed/settings`}>
        <TooltipBasic
          title="Settings"
          className="left-20 top-2 flex items-center justify-center bg-fuchsia-200 text-fuchsia-500"
        >
          <div className="cursor-pointer rounded-lg bg-background p-4 transition duration-300 hover:bg-fuchsia-500 hover:text-white">
            <LiaCogSolid size={20} />
          </div>
        </TooltipBasic>
      </Link>
      <Link passHref href={`/${userType?.toLowerCase()}`}>
        <TooltipBasic
          title="Home"
          className="left-20 top-2 flex items-center justify-center bg-fuchsia-200 text-fuchsia-500"
        >
          <div className="cursor-pointer rounded-lg bg-background p-4 transition duration-300 hover:bg-fuchsia-500 hover:text-white">
            <RiHomeSmileLine size={20} />
          </div>
        </TooltipBasic>
      </Link>
    </div>
  );
};

export default Telemedicine;

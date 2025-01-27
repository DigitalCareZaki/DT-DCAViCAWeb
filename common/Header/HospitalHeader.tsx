'use server';

import Image from 'next/image';

import { FaRegBell } from '@react-icons/all-files/fa/FaRegBell';
import { MdMailOutline } from '@react-icons/all-files/md/MdMailOutline';
import { HiDotsVertical } from '@react-icons/all-files/hi/HiDotsVertical';

import { hospitalIcon } from '@assets';

export default async function HospitalHeader(): Promise<JSX.Element> {
  return (
    <div className="flex h-14 w-full items-center justify-between rounded-2xl border border-t-color-secondary bg-white p-2 px-4">
      <div className="flex items-center gap-2">
        <div className="relative h-8 w-10">
          <Image
            src={hospitalIcon}
            fill
            alt="hospital-icon"
            className="h-full w-full object-cover"
          />
        </div>
        <span>Welcome Agha Khan!</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="icon-counter bg-t-color-primary">
            <span>2</span>
          </div>
          <FaRegBell size={18} />
        </div>
        <div className="relative">
          <div className="icon-counter bg-[#17E4A1]">
            <span>2</span>
          </div>
          <MdMailOutline size={18} />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 rounded-full bg-black">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/5e6ece70bd2f8a6de8472818/714f685e-d0ba-40f9-8bb2-38722c1fd29c/Tiny+Avatar.png"
              alt="profile-image"
              className="h-full w-full rounded-full object-cover"
              fill
            />
          </div>
          <span className="text-xs">Avica</span>
        </div>
        <HiDotsVertical />
      </div>
    </div>
  );
}

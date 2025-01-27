'use server';

import { RiFileExcel2Line } from '@react-icons/all-files/ri/RiFileExcel2Line';
import { FaRegFilePdf } from '@react-icons/all-files/fa/FaRegFilePdf';

import { PrimaryCounter } from '../Counter';

import type { StatisticsCardProps } from './types';

export default async function Statistics({
  title,
  value,
  ruppes,
}: StatisticsCardProps): Promise<JSX.Element> {
  return (
    <div className="flex h-40 w-full flex-col items-center justify-between rounded-3xl border border-t-color-secondary bg-white py-2 text-ssx">
      <span className=" font-semibold tracking-wider text-primary">
        {title}
      </span>
      <div className="card-gradient flex h-10 w-full items-center justify-center gap-1 text-md font-semibold text-white">
        <PrimaryCounter value={value} prefix={ruppes ? 'Rs. ' : ''} />
      </div>
      <div className="flex w-full items-center justify-center gap-2 border-b-2 pb-2 text-t-color-secondary">
        <RiFileExcel2Line size={20} />
        <span>Export Excel</span>
      </div>
      <div className="flex w-full items-center justify-center gap-2 text-secondary">
        <FaRegFilePdf size={20} />
        <span>Export PDF</span>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { MdCheck } from '@react-icons/all-files/md/MdCheck';
import { MdClose } from '@react-icons/all-files/md/MdClose';

import type { ServerComponentProps } from '@types';
import type { TableProps } from './types';


const statusColors: any = {
  HIGH: "bg-red-500",
  LOW: "bg-yellow-500",
  NORMAL: "bg-green-500",
  null: "bg-[#001cbd]",
};

const measurementKeys = ["BLOODGLUCOSE", "BLOODPRESSURE", "TEMPERATURE", "MEDICATION", "SPO2", "ECG"];

const RenderTable: ServerComponentProps<any> = async ({
  data,
  userType,
}) => {
  return (
    <>
      {data?.data?.map((el: any, i: any) => (
        <tr
          key={i}
          className="cursor-pointer border-b text-sm odd:bg-white even:bg-gray-50 hover:bg-gray-200 md:text-base xl:text-lg"
        >
          <th
            scope="row"
            className="whitespace-nowrap px-3 py-2 text-xs font-medium text-gray-900 sm:text-sm md:px-6 md:py-4 md:text-base lg:text-lg xl:text-xl"
          >
            <Link
              passHref
              href={`/${userType}/patient/profile?patient=${el?.patient?.id}`}
              className="hover:underline hover:doctor:text-theme-doctor-primary hover:nurse:text-theme-nurse-primary"
            >
              {`${el?.patient?.first_name} ${el?.patient?.middle_name || ''} ${el?.patient?.last_name}`}
            </Link>
          </th>
          <td className="px-3 py-2 text-xs sm:text-sm md:px-6 md:py-4 md:text-base lg:text-lg xl:text-xl">
            {el?.patient?.email}
          </td>
          {measurementKeys?.map((key) => {
            const measurement = el?.measurements?.[key];
            const status = measurement?.status || null;
            return (
              <td key={key} className="px-3 py-2 md:px-6 md:py-4">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-white ${statusColors[status]}`}
                >
                  {status ? <MdCheck size={14} /> : <MdClose size={14} />}
                </div>
              </td>
            );
          })}
        </tr>
      ))}


      {/* old code  */}
      {/* {data?.map((el, i) => (
        <tr
          key={i}
          className="cursor-pointer border-b text-sm odd:bg-white even:bg-gray-50 hover:bg-gray-200 md:text-base xl:text-lg"
        >
          <th
            scope="row"
            className="whitespace-nowrap px-3 py-2 text-xs font-medium text-gray-900 sm:text-sm md:px-6 md:py-4 md:text-base lg:text-lg xl:text-xl"
          >
            <Link
              passHref
              href={`/${userType}/patient/profile?patient=${el?.user?.id}`}
              className="hover:underline hover:doctor:text-theme-doctor-primary hover:nurse:text-theme-nurse-primary"
            >
              {`${el?.user?.first_name} ${el?.user?.middle_name || ''} ${el?.user?.last_name}`}
            </Link>
          </th>
          <td className="px-3 py-2 text-xs sm:text-sm md:px-6 md:py-4 md:text-base lg:text-lg xl:text-xl">
            {el?.user?.email}
          </td>
          <td className="px-3 py-2 text-xs sm:text-sm md:px-6 md:py-4 md:text-base lg:text-lg xl:text-xl">
            {el?.emr}
          </td>
          {Array.from({ length: 6 }).map((_, index) => (
            <td key={index} className="px-3 py-2 md:px-6 md:py-4">
              <div className="flex h-5 w-5 items-center justify-center rounded-full text-white doctor:bg-theme-doctor-primary nurse:bg-theme-nurse-primary">
                <MdCheck size={14} />
              </div>
            </td>
          ))}
        </tr>
      ))} */}
    </>
  );
};

export default RenderTable;

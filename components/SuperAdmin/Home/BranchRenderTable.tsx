import Link from 'next/link';

import { MdCheck } from '@react-icons/all-files/md/MdCheck';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const BranchRenderTable: ServerComponentProps<any> = async ({ data, userType }) => {
  return (
    <>
      {data.map((el: any, i: any) => (
        <tr
          key={i}
          className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
        >
          {/* <th
            scope="row"
            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
          >
            <Link
              passHref
              href={`/${userType}/patient/profile?patient=${el?.user?.id}`}
              className="hover:underline hover:doctor:text-theme-doctor-primary hover:nurse:text-theme-nurse-primary"
            >
              {`${el?.user?.first_name} ${el?.user?.middle_name || ''} ${el?.user?.last_name}`}
            </Link>
          </th> */}
          <td className="px-6 py-4">{el?.name}</td>
          <td className="px-6 py-4">{el?.email}</td>
          <td className="px-6 py-4">{el?.phone_number}</td>
          <td className="px-6 py-4">{el?.orgnatization?.name}</td>
          <td className="px-6 py-4">{el?.location?.address}</td>

          {/* <td className="px-6 py-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full text-white doctor:bg-theme-doctor-primary nurse:bg-theme-nurse-primary">
              <MdCheck size={14} color="green" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full text-white doctor:bg-theme-doctor-primary nurse:bg-theme-nurse-primary">
              <MdCheck size={14} color="green" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full text-white doctor:bg-theme-doctor-primary nurse:bg-theme-nurse-primary">
              <MdCheck size={14} color="green" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full text-white doctor:bg-theme-doctor-primary nurse:bg-theme-nurse-primary">
              <MdCheck size={14} color="green" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full text-white doctor:bg-theme-doctor-primary nurse:bg-theme-nurse-primary">
              <MdCheck size={14} color="green" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full text-white doctor:bg-theme-doctor-primary nurse:bg-theme-nurse-primary">
              <MdCheck size={14} color="green" />
            </div>
          </td> */}
        </tr>
      ))}
    </>
  );
};

export default BranchRenderTable;

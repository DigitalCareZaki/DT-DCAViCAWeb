'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';

import { IoDownload } from '@react-icons/all-files/io5/IoDownload';
import { IoMdTrash } from 'react-icons/io';

import { getName, getProfilePicture } from '@init-globals';

import type { ClientComponentProps } from '@types';
import { CircleSpinner } from 'react-spinners-kit';

const Record: ClientComponentProps<any> = ({
  patient,
  uri,
  title,
  description,
  created,
  type,
  onDelete,
  showPatientNameColumn,
}) => {
  const [loading, setLoading] = useState<boolean>(false);



  const handleDownload = useCallback(() => {
    setLoading(true);
    if (uri) {
      const link = document.createElement('a');
      link.href = uri;
      link.target = '_blank';
      link.download = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setLoading(false);
  }, [uri]);

  const handleDelete = useCallback(() => {
    if (onDelete) {
      onDelete(); // Trigger delete action
    }
  }, [onDelete]);

  return (



    <tr className="border-b odd:bg-white even:bg-gray-50">
      {/* Profile Picture */}
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
      >
        {/* <div className="relative h-10 w-10 rounded-full">
          <Image
            src={getProfilePicture(patient.user.uri)}
            alt={getName({
              first_name: patient.user.first_name,
              last_name: patient.user.last_name,
              middle_name: patient.user.middle_name,
            })}
            className="h-full w-full rounded-full object-cover"
            fill
          />
        </div> */}
      </th>
      <td className="px-6 py-4">
        {getName({
          first_name: patient.user.first_name,
          last_name: patient.user.last_name,
          middle_name: patient.user.middle_name,
        })}
      </td>
      {/* <td className="px-6 py-4">{title}</td>
      <td className="px-6 py-4">{family_history ?? 'N/A'}</td> */}

      {/* Patient Name */}
      {/* {showPatientNameColumn && (
        <td className="px-6 py-4">
          {getName({
            first_name: patient.user.first_name,
            last_name: patient.user.last_name,
            middle_name: patient.user.middle_name,
          })}
        </td>
      )} */}


      {/* Title */}
      <td className="px-6 py-4">{title}</td>
      {/* Description */}
      <td className="px-6 py-4">{description ?? 'N/A'}</td>
      {/* Created Time */}
      {/* <td className="px-6 py-4">{new Date(created).toLocaleDateString()}</td> */}
      {/* Date */}
      {/* <td className="px-6 py-4">{new Date(created).toLocaleDateString()}</td> */}
      {/* Attachment */}
      <td className="px-6 py-4">{type.toUpperCase() == 'RECORD' ? 'Lab Report' : 'Lab Report'}</td>

      {/* Created At */}
      <td className="px-6 py-4">{new Date(created).toLocaleString()}</td>

      {/* Actions (Download and Delete Buttons) */}
      <td className="flex space-x-4 px-6 py-4">
        {/* Download Button */}
        <div
          onClick={uri ? handleDownload : undefined}
          className={`flex h-8 w-8 items-center justify-center rounded-full text-white transition duration-200 ${uri
            ? 'theme-bg-color cursor-pointer hover:scale-[110%]'
            : 'bg-gray-400 cursor-not-allowed'
            }`}
        >
          {loading ? (
            <CircleSpinner size={16} color="#fff" />
          ) : (
            <IoDownload size={16} />
          )}
        </div>

        {/* Delete Button */}
        {/* <div
          onClick={handleDelete}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white transition duration-200 hover:scale-[110%]"
        >
          <IoMdTrash size={16} />
        </div> */}
      </td>
    </tr>
  );
};

export default Record;

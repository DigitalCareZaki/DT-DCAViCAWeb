'use client';

import { useState } from 'react';
import { FaEye } from '@react-icons/all-files/fa/FaEye';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import { CircleSpinner } from 'react-spinners-kit';
import { useDispatch } from 'react-redux';

import ViewTemplate from './ViewTemplate';

import { toggleEmailTemplate } from '@service';
import { showModalReducer } from '@slice';

import type { ClientComponentProps } from '@types';
import { useRouter } from 'next/navigation';

const Row: ClientComponentProps<any> = ({ ...el }) => {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleToggle = async () => {
    try {
      setLoading(true);

      const res = await toggleEmailTemplate(
        btoa(JSON.stringify({ id: el.id }))
      );

      if (!res.success) {
        dispatch(
          showModalReducer({
            message: res?.message ?? 'Something went wrong',
            type: 'ERROR',
            show: true,
          })
        );
        return;
      }

      dispatch(
        showModalReducer({
          message: 'Email changed',
          type: 'SUCCESS',
          show: true,
        })
      );
      router.refresh();
    } catch (err: any) {
      dispatch(
        showModalReducer({
          message: err?.message ?? 'Something went wrong',
          type: 'ERROR',
          show: true,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <tr
        key={el.id}
        className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
      >
        <th
          scope="row"
          className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
        >
          {el?.customKey}
        </th>
        <td className="px-6 py-4">{el?.subject}</td>
        <td className="px-6 py-4">
          {new Date(el?.created_at).toDateString() +
            '-' +
            new Date(el?.created_at).toLocaleTimeString('en', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
        </td>
        <td className="px-6 py-4">{el?.active ? 'Yes' : 'No'}</td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <div
              onClick={() => setShow(true)}
              className="flex h-6 w-6 items-center justify-center gap-4 rounded-full bg-black text-white"
            >
              <FaEye size={12} className="text-white" />
            </div>
            {!el.active && (
              <div
                onClick={handleToggle}
                className="flex h-6 w-6 items-center justify-center gap-4 rounded-full bg-black text-white"
              >
                {loading ? (
                  <CircleSpinner size={20} color="#fff" />
                ) : (
                  <FaCheck size={12} className="text-white" />
                )}
              </div>
            )}
          </div>
        </td>
      </tr>
      <ViewTemplate
        subject={el?.subject}
        key={el?.key}
        id={el?.id}
        html={el?.html}
        show={show}
        customkey={el?.customKey}
        active={false}
        created_at={el?.created_at}
        handleClose={handleClose}
      />
    </>
  );
};

export default Row;

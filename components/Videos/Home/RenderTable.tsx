'use client';

import { getName } from '@init-globals';
import Link from 'next/link';
import type { ClientComponentProps } from '@types';
import type { Props } from './types';

const RenderTable: ClientComponentProps<Props> = ({ data }) => {
  if (!data) return <></>;

  if (data.length === 0) {
    return (
      <tr className="border-b odd:bg-white even:bg-gray-50">
        <td colSpan={8} className="px-6 py-8 text-center text-gray-600">
          No videos available.
        </td>
      </tr>
    );
  }

  return (
    <>
      {data.map((el) => (
        <tr
          key={el?.id}
          className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
        >
          <th
            scope="row"
            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
          >
            {el.title}
          </th>
          <td className="line-clamp-1 px-6 py-14">{el.description}</td>
          <td className="px-6 py-4">{el.category}</td>
          <td className="px-6 py-4">{el.priority}</td>
          <td className="px-6 py-4">
            <Link href={el.uri} target="_blank">
              {el.uri}
            </Link>
          </td>
          <td className="px-6 py-4">{el.branch.name}</td>
          <td className="px-6 py-4">
            {getName({
              ...el.author,
            })}
          </td>
          <td className="px-6 py-4">
            {new Date(el.created_at).toLocaleString()}
          </td>
        </tr>
      ))}
    </>
  );
};

export default RenderTable;

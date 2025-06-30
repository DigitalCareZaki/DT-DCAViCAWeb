'use server';

import { getName } from '@init-globals';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const RenderTable: ServerComponentProps<Props> = async ({ data }) => {
  if (!data) return <></>;
  return (
    <>

      {data.length > 0 && data?.map((el) => (
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
          <td className="px-6 py-4">{el.uri}</td>
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

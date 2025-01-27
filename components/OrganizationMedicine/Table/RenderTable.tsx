'use server';

import type { ServerComponentProps } from '@types';
import type { TableProps } from './types';

const RenderTable: ServerComponentProps<TableProps> = async ({ data }) => (
  <>
    {data.map((item) => (
      <tr key={item.id} className="border-b odd:bg-white even:bg-gray-50">
        <td className="px-6 py-4">{item.name}</td>
        <td className="px-6 py-4">
          {new Date(item.created_at).toLocaleString()}
        </td>
      </tr>
    ))}
  </>
);

export default RenderTable;

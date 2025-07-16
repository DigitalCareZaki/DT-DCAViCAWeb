'use server';

import type { ServerComponentProps } from '@types';
import type { TableProps } from './types';
import { FaEdit } from 'react-icons/fa';

const RenderTable: ServerComponentProps<TableProps & { onEdit?: (item: any) => void }> = async ({ data, onEdit }) => (
  <>
    {data.map((item) => (
      <tr key={item.id} className="border-b odd:bg-white even:bg-gray-50">
        <td className="px-6 py-4 flex items-center gap-2">
          {item.name}
          {onEdit && (
            // <button onClick={() => onEdit(item)} className="ml-2 text-blue-500 hover:text-blue-700" title="Edit">
            <FaEdit
              onClick={() => onEdit(item)}
              title="Edit"
              className="hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-admin-primary hover:doctor:text-theme-doctor-primary hover:nurse:text-theme-nurse-primary"
            />
            // </button>
          )}
        </td>
        <td className="px-6 py-4">
          {new Date(item.created_at).toLocaleString()}
        </td>
      </tr>
    ))}
  </>
);

export default RenderTable;

'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import { IoEye } from '@react-icons/all-files/io5/IoEye';

import { getSuperAdminBranch } from '@service';
import BranchViewModal from './BranchViewModal';

import type { BranchesDataProps, ClientComponent } from '@types';
import type { ReduxProps, StoreSuperAdminState } from '@store-types';

const RenderTable: ClientComponent = () => {
  const [selectedBranch, setSelectedBranch] = useState<BranchesDataProps | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { branches } = useSelector<ReduxProps, StoreSuperAdminState>(
    (state) => state.superadmin
  );

  const handleViewBranch = async (branch: BranchesDataProps) => {
    setSelectedBranch(branch);
    setShowModal(true);
    setLoading(true);

    try {
      const res = await getSuperAdminBranch(branch.id);

      if (res.success) {
        setSelectedBranch(res.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {branches.map((el) => (
        <tr
          key={el.id}
          className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
        >
          <th
            scope="row"
            className="whitespace-nowrap px-6  font-medium text-gray-900"
          >
            {el.name}
          </th>
          <td className="px-6 py-4">{el.email}</td>
          <td className="px-6 py-4">{el.phone_number}</td>
          <td className="px-6 py-4">{el.location.address}</td>
          <td className="px-6 py-4">{el.created_by}</td>
          <td className="px-6 py-4">
            <button
              type="button"
              onClick={() => handleViewBranch(el)}
              className="theme-text-color rounded p-1 transition hover:bg-gray-100"
              title="View Branch"
            >
              <IoEye size={18} />
            </button>
          </td>
        </tr>
      ))}

      {showModal && (
        <BranchViewModal
          branch={selectedBranch}
          loading={loading}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default RenderTable;

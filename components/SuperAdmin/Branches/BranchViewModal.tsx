'use client';

import { FaTimes } from '@react-icons/all-files/fa/FaTimes';

import type { BranchesDataProps, ClientComponentProps } from '@types';

interface BranchViewModalProps {
  branch: BranchesDataProps | null;
  loading: boolean;
  onClose: () => void;
}

const labelClass = 'text-sm font-medium text-gray-500';
const valueClass = 'text-base font-semibold text-gray-900 break-words';

const BranchViewModal: ClientComponentProps<BranchViewModalProps> = ({
  branch,
  loading,
  onClose,
}) => {
  const renderField = (label: string, value?: string | number | null) => (
    <div className="flex flex-col gap-1 overflow-hidden">
      <span className={labelClass}>{label}</span>
      <span className={valueClass}>{value || 'N/A'}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <button
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          <FaTimes size={22} />
        </button>

        <div className="rounded-t-2xl bg-green-50 px-8 py-6">
          <p className="text-sm font-semibold uppercase tracking-wide theme-text-color">
            Branch Details
          </p>
          {/* <h2 className="mt-2 pr-8 text-2xl font-bold text-gray-900">
            {loading ? 'Loading...' : branch?.name || 'N/A'}
          </h2> */}
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-8 py-6">
          {loading ? (
            <div className="py-10 text-center text-gray-500">
              Loading branch details...
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
              {renderField('Name', branch?.name)}
              {renderField('Email', branch?.email)}
              {renderField('Phone Number', branch?.phone_number)}
              {renderField('Created By', branch?.created_by)}
              {renderField('Address', branch?.location?.address)}
              {renderField('City', branch?.location?.city?.name)}
              {renderField('Country', branch?.location?.city?.country?.name)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BranchViewModal;

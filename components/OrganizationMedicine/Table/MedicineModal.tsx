import React, { useState, useEffect } from 'react';
import { InputBasic, ButtonPrimary, DropdownSecondary } from '@common';
import { getSuperAdminBranches } from '@service';
import { useUser } from '@selectors';

interface MedicineModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd?: (medicine: string, branchId?: string) => Promise<void> | void;
    isEdit?: boolean;
    initialValue?: string;
    onUpdate?: (medicine: string) => Promise<void> | void;
}

const MedicineModal: React.FC<MedicineModalProps> = ({ isOpen, onClose, onAdd, isEdit = false, initialValue = '', onUpdate }) => {
    const [medicine, setMedicine] = useState(initialValue);
    const [error, setError] = useState('');
    const [branches, setBranches] = useState<any[]>([]);
    const [selectedBranchId, setSelectedBranchId] = useState<string>('');
    const [user] = useUser();

    // Fetch branches for superadmin
    useEffect(() => {
        const fetchBranches = async () => {
            if (user?.role === 'SUPERADMIN') {
                const res = await getSuperAdminBranches();
                if (res?.success && Array.isArray(res.data)) {
                    setBranches(res.data);
                }
            }
        };
        fetchBranches();
    }, [user]);

    // Reset input when modal opens/closes or initialValue changes
    React.useEffect(() => {
        setMedicine(initialValue);
        setError('');
        setSelectedBranchId(''); // Reset branch selection when modal opens
    }, [isOpen, initialValue]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!medicine.trim()) {
            setError('Medicine name is required');
            return;
        }

        try {
            if (isEdit && onUpdate) {
                await onUpdate(medicine.trim());
            } else if (onAdd) {
                await onAdd(medicine.trim(), selectedBranchId || undefined);
            }
            setMedicine('');
            setError('');
            setSelectedBranchId('');
        } catch (err: any) {
            const backendMessage = err?.response?.data?.message || err?.message;
            setError(backendMessage || 'Failed to save medicine');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/3 rounded-lg bg-white">
                <div className="rounded-xl bg-white p-4 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-black"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex h-fit w-full flex-col gap-5 rounded-2xl bg-white p-6"
                >
                    <InputBasic
                        label="Medicine"
                        placeholder="Medicine"
                        value={medicine}
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setMedicine(e.target.value)}
                        error={!!error}
                        errorMessage={error || '&'}
                    />

                    {/* Branch Dropdown for Super Admin */}
                    {user?.role === 'SUPERADMIN' && !isEdit && (
                        <DropdownSecondary
                            title="Branch"
                            label="Branch"
                            borderTheme
                            inputWrapperClassName="bg-white"
                            selected={branches.find((b: any) => b.id === selectedBranchId)?.name || 'Select Branch'}
                        >
                            {branches && branches.length > 0 ? (
                                branches.map((branch: any) => (
                                    <div
                                        key={branch.id}
                                        onClick={() => setSelectedBranchId(branch.id)}
                                        className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg bg-white p-2 px-4 text-gray-500 transition duration-200 hover:bg-gray-200"
                                    >
                                        <span className="font-medium">{branch.name}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="p-2 text-gray-400">No branches found</div>
                            )}
                        </DropdownSecondary>
                    )}

                    <div className="flex flex-col gap-4 justify-end">
                        <ButtonPrimary name={isEdit ? 'Update' : 'Add'} />
                        <ButtonPrimary name="Close" type="button" onClick={onClose} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MedicineModal;

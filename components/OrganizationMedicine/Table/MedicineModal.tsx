import React, { useState } from 'react';
import { InputBasic, ButtonPrimary } from '@common';

interface MedicineModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (medicine: string) => void;
}

const MedicineModal: React.FC<MedicineModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [medicine, setMedicine] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!medicine.trim()) {
            setError('Medicine name is required');
            return;
        }
        onAdd(medicine.trim());
        setMedicine('');
        setError('');
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
                    <ButtonPrimary name="Add" />
                </form>
            </div>
        </div>
    );
};

export default MedicineModal;

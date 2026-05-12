import React, { useState, useEffect, useRef } from 'react';
import { InputBasic, ButtonPrimary } from '@common';
import { countries } from './countries';
import { IoClose, IoChevronDown } from 'react-icons/io5';

import { getSuperAdminBranches } from '@service';
import { useUser } from '@selectors';

import type { SiteProps, BranchesDataProps } from '@types';

interface SiteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
    initialData?: SiteProps | null;
}

const SiteModal: React.FC<SiteModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [address, setAddress] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [branchSearchTerm, setBranchSearchTerm] = useState('');
    const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
    const [branches, setBranches] = useState<BranchesDataProps[]>([]);
    const [branchId, setBranchId] = useState<string>('');
    const wrapperRef = useRef<HTMLDivElement>(null);
    const branchWrapperRef = useRef<HTMLDivElement>(null);
    const [user] = useUser();

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            if (wrapperRef.current && !wrapperRef.current.contains(target)) setDropdownOpen(false);
            if (branchWrapperRef.current && !branchWrapperRef.current.contains(target)) setBranchDropdownOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef, branchWrapperRef]);

    // Reset or Populate when modal opens
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setName(initialData.name || '');
                setDescription(initialData.description || '');
                setCountryCode(initialData.countryCode || '');
                setAddress(initialData.address || '');
                const initialBranchId = initialData.branch?.id || initialData.branchId || '';
                setBranchId(initialBranchId);
                // Initial search term for country
                if (initialData.countryCode) {
                    const found = countries.find(c => c.code === initialData.countryCode);
                    if (found) {
                        setSearchTerm(`${found.code} (${found.name})`);
                    } else {
                        setSearchTerm(initialData.countryCode);
                    }
                } else {
                    setSearchTerm('');
                }
            } else {
                setName('');
                setDescription('');
                setCountryCode('');
                setAddress('');
                setSearchTerm('');
                setBranchSearchTerm('');
                setBranchId('');
            }
            setError('');
            setDropdownOpen(false);
            setBranchDropdownOpen(false);
        }
    }, [isOpen, initialData]);

    useEffect(() => {
        const fetchBranches = async () => {
            if (!isOpen || user?.role !== 'SUPERADMIN') return;

            try {
                const res = await getSuperAdminBranches();
                if (res?.success && Array.isArray(res.data)) {
                    setBranches(res.data);
                } else {
                    setBranches([]);
                }
            } catch {
                setBranches([]);
            }
        };

        fetchBranches();
    }, [isOpen, user]);

    const selectedBranch = branches.find((branch) => branch.id === branchId);
    const selectedBranchName = selectedBranch?.name || '';

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Name is required');
            return;
        }
        if (!countryCode) {
            setError('Country Code is required');
            return;
        }
        if (user?.role === 'SUPERADMIN' && !branchId) {
            setError('Branch is required');
            return;
        }

        try {
            const payload: any = { name, description, countryCode, address };
            if (user?.role === 'SUPERADMIN' && branchId) {
                payload.branchId = branchId;
            }
            await onSubmit(payload);
            onClose();
        } catch (err: any) {
            setError(err?.message || 'Failed to submit');
        }
    };

    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredBranches = branches.filter((branch) =>
        branch.name.toLowerCase().includes(branchSearchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-poppins">
            <div className="w-full max-w-2xl rounded-lg bg-white shadow-lg relative flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-2">
                    <h2 className="text-xl font-bold text-gray-800">{initialData ? 'Edit Site' : 'Add New Site'}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 pt-2">
                    {/* Name */}
                    <div className="flex items-center gap-4">
                        <label className="w-32 text-right text-sm text-gray-600">
                            <span className="text-red-500 mr-1">*</span>Name :
                        </label>
                        <div className="flex-1">
                            <InputBasic
                                placeholder=""
                                value={name}
                                onChange={(e: any) => setName(e.target.value)}
                                inputWrapperClassName="h-10 border border-gray-300 rounded focus-within:border-blue-500 max-w-lg"
                                inputClassName="p-2 text-sm"
                                hideInfo
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex items-start gap-4">
                        <label className="w-32 text-right text-sm text-gray-600 mt-2">
                            Description :
                        </label>
                        <div className="flex-1">
                            <textarea
                                placeholder=""
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border border-gray-300 rounded focus:border-blue-500 w-full max-w-lg min-h-[80px] p-2 text-sm outline-none resize-none"
                            />
                        </div>
                    </div>

                    {/* Country Code */}
                    <div className="flex items-center gap-4 relative">
                        <label className="w-32 text-right text-sm text-gray-600">
                            Country Code :
                        </label>
                        <div className="flex-1 max-w-lg relative" ref={wrapperRef}>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Please choose country code"
                                    className="w-full h-10 border border-blue-400 rounded px-3 text-sm outline-none focus:border-blue-600"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setDropdownOpen(true);
                                        if (e.target.value === '') setCountryCode('');
                                    }}
                                    onClick={() => setDropdownOpen(true)}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <IoChevronDown size={18} />
                                </div>
                            </div>

                            {dropdownOpen && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-[400px] overflow-y-auto">
                                    {filteredCountries.length > 0 ? (
                                        filteredCountries.map((country) => (
                                            <div
                                                key={country.code}
                                                onClick={() => {
                                                    setCountryCode(country.code);
                                                    setSearchTerm(`${country.code} (${country.name})`);
                                                    setDropdownOpen(false);
                                                }}
                                                className="flex h-9 w-full cursor-pointer items-center px-4 hover:bg-gray-100 text-sm text-gray-700 hover:bg-blue-50"
                                            >
                                                {country.code} ({country.name})
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-2 text-gray-400 text-sm">No countries found</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {user?.role === 'SUPERADMIN' && (
                        <div className="flex items-center gap-4">
                            <label className="w-32 text-right text-sm text-gray-600">
                                Branch :
                            </label>
                            <div className="flex-1 max-w-lg relative" ref={branchWrapperRef}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Please choose branch"
                                        className="w-full h-10 border border-blue-400 rounded px-3 text-sm outline-none focus:border-blue-600"
                                        value={branchSearchTerm || selectedBranchName}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setBranchSearchTerm(value);
                                            setBranchDropdownOpen(true);
                                            if (value === '') setBranchId('');
                                        }}
                                        onClick={() => setBranchDropdownOpen(true)}
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <IoChevronDown size={18} />
                                    </div>
                                </div>

                                {branchDropdownOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-[400px] overflow-y-auto">
                                        {filteredBranches.length > 0 ? (
                                            filteredBranches.map((branch) => (
                                                <div
                                                    key={branch.id}
                                                    onClick={() => {
                                                        setBranchId(branch.id);
                                                        setBranchSearchTerm(branch.name);
                                                        setBranchDropdownOpen(false);
                                                    }}
                                                    className="flex h-9 w-full cursor-pointer items-center px-4 hover:bg-gray-100 text-sm text-gray-700 hover:bg-blue-50"
                                                >
                                                    {branch.name}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-2 text-gray-400 text-sm">No branches found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Address */}
                    <div className="flex items-start gap-4">
                        <label className="w-32 text-right text-sm text-gray-600 mt-2">
                            Address :
                        </label>
                        <div className="flex-1">
                            <textarea
                                placeholder=""
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="border border-gray-300 rounded focus:border-blue-500 w-full max-w-lg min-h-[60px] p-2 text-sm outline-none"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">

                        <ButtonPrimary
                            name="Cancel"
                            onClick={onClose}
                            className="w-32 h-11 text-base font-bold rounded"
                        />
                        <ButtonPrimary
                            name="OK"
                            onClick={handleSubmit}
                            className="w-32 h-11 text-base font-bold rounded"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SiteModal;

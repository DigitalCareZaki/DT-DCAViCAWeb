import React, { useState, useEffect, useRef } from 'react';
import { InputBasic, ButtonPrimary } from '@common';
import { countries } from './countries';
import { IoClose, IoChevronDown } from 'react-icons/io5';

import type { SiteProps } from '@types';

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
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    // Reset or Populate when modal opens
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setName(initialData.name || '');
                setDescription(initialData.description || '');
                setCountryCode(initialData.countryCode || '');
                setAddress(initialData.address || '');
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
            }
            setError('');
            setDropdownOpen(false);
        }
    }, [isOpen, initialData]);

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

        try {
            await onSubmit({ name, description, countryCode, address });
            onClose();
        } catch (err: any) {
            setError(err?.message || 'Failed to submit');
        }
    };

    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-poppins">
            <div className="w-full max-w-2xl rounded-lg bg-white shadow-lg relative flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-2">
                    <h2 className="text-xl font-bold text-gray-800">{initialData ? 'Edit Site' : 'New Site'}</h2>
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
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors font-medium"
                        >
                            OK
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SiteModal;

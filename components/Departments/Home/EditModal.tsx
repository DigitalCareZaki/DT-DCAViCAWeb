'use client';

import { useEffect, useState } from 'react';
import { InputBasic, ButtonPrimary } from '@common';
import { getDepartmentBranches, getDepartmentCities, updateDepartment } from '@service';

import type { ClientComponentProps } from '@types';

interface BranchOption {
    id: string;
    name: string;
}

interface EditModalProps {
    open: boolean;
    onClose: () => void;
    department: any;
    onUpdated?: () => void;
}

const EditModal: ClientComponentProps<EditModalProps> = ({ open, onClose, department, onUpdated }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [branchId, setBranchId] = useState<string>('');
    const [branches, setBranches] = useState<BranchOption[]>([]);
    const [cities, setCities] = useState<BranchOption[]>([]);
    const [cityId, setCityId] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [zipcode, setZipcode] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (!open) return;
        setTitle(department?.title ?? '');
        setDescription(department?.description ?? '');
        setBranchId(department?.branch?.id ?? department?.branch_id ?? '');
        setCityId(department?.location?.city?.id ?? department?.city_id ?? '');
        setAddress(department?.location?.address ?? department?.address ?? '');
        setZipcode(department?.location?.zipcode ?? department?.zipcode ?? '');
    }, [open, department]);

    useEffect(() => {
        const run = async () => {
            const res = await getDepartmentBranches();
            if (res.success) setBranches(res.data as any);
        };
        if (open) run();
    }, [open]);

    useEffect(() => {
        const run = async () => {
            const res = await getDepartmentCities();
            if (res.success) setCities(res.data as any);
        };
        if (open) run();
    }, [open]);

    if (!open) return <></>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const payload = {
                title: title || undefined,
                description: description || undefined,
                branch_id: branchId || undefined,
                city_id: cityId || undefined,
                address: address || undefined,
                zipcode: zipcode || undefined,
            } as any;
            await updateDepartment(department.id, btoa(JSON.stringify(payload)));
            onUpdated?.();
            onClose();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-xl rounded-xl bg-white p-6">
                <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <InputBasic
                            label="Department/Speciality"
                            placeholder="Enter department name"
                            value={title}
                            onChange={(e: any) => setTitle(e.target.value)}
                        />
                        <InputBasic
                            label="About"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e: any) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="flex w-full flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Select Branch</label>
                            <select
                                className="w-full rounded-lg border border-gray-300 p-2.5 outline-none"
                                value={branchId}
                                onChange={(e) => setBranchId(e.target.value)}
                            >
                                <option value="">Select Department Branch</option>
                                {branches?.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Select City</label>
                            <select
                                className="w-full rounded-lg border border-gray-300 p-2.5 outline-none"
                                value={cityId}
                                onChange={(e) => setCityId(e.target.value)}
                            >
                                <option value="">Select Department City</option>
                                {cities?.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <InputBasic
                            label="Address"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e: any) => setAddress(e.target.value)}
                        />
                        <InputBasic
                            label="Zipcode"
                            placeholder="Enter zipcode"
                            value={zipcode}
                            onChange={(e: any) => setZipcode(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <ButtonPrimary name={submitting ? 'Saving...' : 'Save'} disabled={submitting} />
                        <ButtonPrimary name="Close" type="button" onClick={onClose} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;


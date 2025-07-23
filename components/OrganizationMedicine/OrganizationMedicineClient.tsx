"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizationMedicines } from "../../store/organizationMedicine.thunks";
import { updateOrganizationMedicineAndUpdate } from '../../store/organizationMedicine.thunks';
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';

import Header from "./Table/Header";
import Table from "./Table/RenderTable";
import { twMerge } from 'tailwind-merge';
import MedicineModal from './Table/MedicineModal';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const OrganizationMedicine = () => {
    const dispatch = useDispatch();
    const medicines = useSelector((state: any) => state.organizationMedicine.medicines);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editMedicine, setEditMedicine] = useState<any>(null);


    console.log('medicines >>>', medicines);

    useEffect(() => {
        dispatch<any>(fetchOrganizationMedicines());
    }, [dispatch]);

    const handleEdit = (item: any) => {
        setEditMedicine(item);
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (name: string) => {
        if (editMedicine) {
            const res = await dispatch<any>(updateOrganizationMedicineAndUpdate(editMedicine.id, name));
            if (res?.success) {
                toast.success('Medicine updated');
            } else {
                toast.error('Failed to update medicine');
            }
        }
        setIsEditModalOpen(false);
        setEditMedicine(null);
    };

    const handleCloseEdit = () => {
        setIsEditModalOpen(false);
        setEditMedicine(null);
    };

    return (
        <div className="h-screen overflow-y-scroll pb-96 font-poppins">
            <MedicineModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEdit}
                isEdit={true}
                initialValue={editMedicine?.name || ''}
                onUpdate={handleUpdate}
            />
            <Header />
            <div className="relative mt-10 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-xs sm:text-sm md:text-base text-gray-700">
                    <thead
                        className={twMerge(
                            'text-xs sm:text-sm md:text-base uppercase text-white superadmin:bg-theme-superadmin-primary admin:bg-theme-admin-primary doctor:bg-theme-doctor-primary patient:bg-theme-patient-primary nurse:bg-theme-nurse-primary',
                        )}
                    >
                        <tr>
                            <th className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls">Name</th>
                            <th className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls">Created On</th>
                            <th className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                        {medicines.map((item: any) => (
                            <tr key={item.id} className="border-b odd:bg-white even:bg-gray-50">
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{new Date(item.created_at).toLocaleString()}</td>
                                <td className="px-6 py-4 flex items-center gap-2">

                                    <FaEdit
                                        onClick={() => handleEdit(item)}
                                        title="Edit"
                                        className="hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-admin-primary hover:doctor:text-theme-doctor-primary hover:nurse:text-theme-nurse-primary"
                                    />

                                    {/* <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700" title="Edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 10-4-4l-8 8v3zm0 0v3h3" />
                                        </svg>
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrganizationMedicine;

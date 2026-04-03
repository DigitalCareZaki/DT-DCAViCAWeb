"use client";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizationMedicines } from "../../store/organizationMedicine.thunks";
import { updateOrganizationMedicineAndUpdate } from '../../store/organizationMedicine.thunks';
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import Header from "./Table/Header";
import Table from "./Table/RenderTable";
import { twMerge } from 'tailwind-merge';
import MedicineModal from './Table/MedicineModal';
import { toast } from 'react-hot-toast';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { InputBasic } from '@common';
import { getName } from '@init-globals';



const mainStyle = {
    transform: 'scale(0.67)',
    transformOrigin: 'top left',
    width: '150%',
    height: '150%',
    overflow: 'hidden',
};

const OrganizationMedicine = () => {
    const dispatch = useDispatch();
    const medicines = useSelector((state: any) => state.organizationMedicine.medicines);
    const pagination = useSelector((state: any) => state.organizationMedicine.pagination);
    const [page, setPage] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editMedicine, setEditMedicine] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter medicines based on search term
    const filteredMedicines = useMemo(() => {
        if (!searchTerm.trim()) {
            return medicines;
        }

        const lowerSearchTerm = searchTerm.toLowerCase();
        return medicines.filter((medicine: any) =>
            medicine.name.toLowerCase().includes(lowerSearchTerm)
        );
    }, [medicines, searchTerm]);


    useEffect(() => {
        setLoading(true);
        dispatch<any>(fetchOrganizationMedicines(page))
            .finally(() => setLoading(false));
    }, [dispatch, page]);

    const handleEdit = (item: any) => {
        setEditMedicine(item);
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (name: string) => {
        if (editMedicine) {
            const res = await dispatch<any>(updateOrganizationMedicineAndUpdate(editMedicine.id, name));
            if (res?.success) {
                toast.success('Medicine updated');
                dispatch<any>(fetchOrganizationMedicines(page));
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
        <div className="min-h-screen pb-24 md:pb-96 font-poppins">
            <MedicineModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEdit}
                isEdit={true}
                initialValue={editMedicine?.name || ''}
                onUpdate={handleUpdate}
            />
            <Header />
            <div className="mt-6 flex w-full justify-between items-center px-4">
                <div className="w-full max-w-md">
                    <InputBasic
                        icon="IoSearch"
                        placeholder="Search medicines..."
                        value={searchTerm}
                        onChange={(e: any) => setSearchTerm(e.target.value)}
                        borderTheme
                        inputWrapperClassName="bg-white"
                        inputClassName="bg-white"
                    />
                </div>
            </div>
            {loading ? (
                <div
                    style={mainStyle}
                    className="flex h-full w-screen items-center justify-center bg-background"
                >
                    <div
                        className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                        role="status"
                    ></div>
                </div>
            ) : (
                <div className="relative mt-10 shadow-md sm:rounded-lg">
                    <table className="w-full text-left text-xs sm:text-sm md:text-base text-gray-700">
                        <thead
                            className={twMerge(
                                'text-xs sm:text-sm md:text-base uppercase text-white superadmin:bg-theme-superadmin-primary admin:bg-theme-admin-primary doctor:bg-theme-doctor-primary patient:bg-theme-patient-primary nurse:bg-theme-nurse-primary',
                            )}
                        >
                            <tr>
                                <th className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls">Name</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls">Created On</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls">Added By</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls">Branch</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                            {filteredMedicines?.map((item: any) => (

                                <tr key={item.id} className="border-b odd:bg-white even:bg-gray-50">
                                    <td className="px-6 py-4">{item?.name}</td>
                                    <td className="px-6 py-4">{new Date(item?.created_at).toLocaleString()}</td>
                                    <td className="px-6 py-4">{item?.addedBy ? getName(item.addedBy) : 'N/A'}</td>
                                    <td className="px-6 py-4">{item?.branch?.name}</td>
                                    <td className="px-6 py-4 flex items-center gap-2">

                                        <FaEdit
                                            onClick={() => handleEdit(item)}
                                            title="Edit"
                                            className="hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-admin-primary hover:doctor:text-theme-doctor-primary hover:nurse:text-theme-nurse-primary"
                                        />

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {pagination && (
                <div className="md:static fixed bottom-0 left-0 right-0 bg-white md:bg-transparent z-30 py-4 md:py-7 shadow md:shadow-none">
                    <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
                        <button
                            onClick={() => setPage(p => Math.max(p - 1, 1))}
                            disabled={!pagination.hasPrevPage || loading}
                            className="rounded-full bg-gray-200 px-3 py-1 disabled:opacity-50"
                        >
                            <FaArrowLeft className="w-5 h-5 text-gray-700 " />
                        </button>

                        <span className="text-sm">
                            Page {pagination.currentPage} of {pagination.totalPages}
                        </span>

                        <button
                            onClick={() => setPage(p => Math.min(p + 1, pagination.totalPages))}
                            disabled={!pagination.hasNextPage || loading}
                            className="rounded-full bg-gray-200 px-3 py-1 disabled:opacity-50"
                        >
                            <FaArrowRight className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrganizationMedicine;

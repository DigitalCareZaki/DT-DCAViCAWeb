"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizationMedicines } from "../../store/organizationMedicine.thunks";

import Header from "./Table/Header";
import Table from "./Table/RenderTable";
import { twMerge } from 'tailwind-merge';

const OrganizationMedicine = () => {
    const dispatch = useDispatch();
    const medicines = useSelector((state: any) => state.organizationMedicine.medicines);

    useEffect(() => {
        dispatch<any>(fetchOrganizationMedicines());
    }, [dispatch]);

    return (
        <div className="h-screen overflow-y-scroll pb-96 font-poppins">
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
                        </tr>
                    </thead>
                    <tbody className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                        {medicines.map((item: any) => (
                            <tr key={item.id} className="border-b odd:bg-white even:bg-gray-50">
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{new Date(item.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrganizationMedicine;

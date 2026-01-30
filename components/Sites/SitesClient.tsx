"use client";
import { useEffect, useState } from "react";
import getSites from "../../service/superadmin/getSites";
import createSite from "../../service/superadmin/createSite";
import updateSite from "../../service/superadmin/updateSite";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import type { SiteProps } from '@types';
import { ButtonPrimary } from '@common';
import SiteModal from './SiteModal';
import { toast } from 'react-hot-toast';

const mainStyle = {
    transform: 'scale(0.67)',
    transformOrigin: 'top left',
    width: '150%',
    height: '150%',
    overflow: 'hidden',
};

const SitesClient = () => {
    const [sites, setSites] = useState<SiteProps[]>([]);
    const [pagination, setPagination] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSite, setSelectedSite] = useState<SiteProps | null>(null);

    const fetchSites = async () => {
        setLoading(true);
        try {
            const res = await getSites(page, 10);
            if (res.success && res.data) {
                setSites(res.data.data);
                setPagination(res.data.pagination);
            }
        } catch (error) {
            console.error('Failed to fetch sites:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSites();
    }, [page]);

    const handleSiteSubmit = async (data: any) => {
        let res;
        if (selectedSite) {
            res = await updateSite(selectedSite.id, JSON.stringify(data));
        } else {
            res = await createSite(JSON.stringify(data));
        }

        if (res.success) {
            toast.success(res.message);
            fetchSites();
        } else {
            toast.error(res.message);
            throw new Error(res.message);
        }
    };

    return (
        <div className="min-h-screen pb-24 md:pb-96 font-poppins">
            <SiteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSiteSubmit}
                initialData={selectedSite}
            />
            <div className="mt-10 flex h-full w-full flex-col gap-6 overflow-y-scroll pl-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Sites</h1>
                    <div className="w-40">
                        <ButtonPrimary
                            name="Add New Site"
                            onClick={() => {
                                setSelectedSite(null);
                                setIsModalOpen(true);
                            }}
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
                    <div className="relative mt-6 shadow-md sm:rounded-lg">
                        <table className="w-full text-left text-xs sm:text-sm md:text-base text-gray-700">
                            <thead
                                className={twMerge(
                                    'text-xs sm:text-sm md:text-base uppercase text-white superadmin:bg-theme-superadmin-primary admin:bg-theme-admin-primary doctor:bg-theme-doctor-primary patient:bg-theme-patient-primary nurse:bg-theme-nurse-primary',
                                )}
                            >
                                <tr>
                                    {/* <th className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls">ID</th>
                                    <th className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls">Vivalink Site ID</th> */}
                                    <th className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls">Name</th>
                                    <th className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls">Description</th>
                                    <th className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls">Country Code</th>
                                    <th className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls">Address</th>
                                    <th className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                                {sites?.map((site: SiteProps) => (
                                    <tr key={site.id} className="border-b odd:bg-white even:bg-gray-50">
                                        {/* <td className="px-6 py-4">{site.id}</td>
                                        <td className="px-6 py-4">{site.vivalinkSiteId}</td> */}
                                        <td className="px-6 py-4">{site.name}</td>
                                        <td className="px-6 py-4">{site.description}</td>
                                        <td className="px-6 py-4">{site.countryCode}</td>
                                        <td className="px-6 py-4">{site.address}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => {
                                                    setSelectedSite(site);
                                                    setIsModalOpen(true);
                                                }}
                                                className="text-gray-500 hover:text-blue-600 transition-colors"
                                            >
                                                <MdEdit size={20} />
                                            </button>
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
                                <FaArrowLeft className="w-5 h-5 text-gray-700" />
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
        </div>
    );
};

export default SitesClient;

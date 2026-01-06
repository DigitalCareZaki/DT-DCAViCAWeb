'use client';

import { useState, useMemo, useEffect } from 'react';
import Header from './Header';
import Table from './Table';
import { useDebounce } from '@hooks';
import { getPatientList } from '@actions';

const PatientsSection = ({ initialData, userType, initialPagination }: any) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState(initialData);
    const [pagination, setPagination] = useState(initialPagination);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setData(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        if (initialPagination) {
            setPagination(initialPagination);
        }
    }, [initialPagination]);

    const debouncedSearch = useDebounce(searchTerm, 500);

    const fetchData = async (page: number) => {
        setIsLoading(true);
        const response = await getPatientList(userType, page, 10);
        if (response.success) {
            setData(response?.data);
            setPagination(response?.data?.pagination);
        }
        setIsLoading(false);
    };

    const filteredData = useMemo(() => {
        if (!debouncedSearch) return data;
        const lowerSearch = debouncedSearch.toLowerCase();
        return {
            ...data,
            data: data?.data?.filter((el: any) => {
                const patient = el?.patient;
                if (!patient) return false;
                const fullName = `${patient.first_name || ''} ${patient.middle_name || ''} ${patient.last_name || ''}`.toLowerCase();
                const email = patient.email?.toLowerCase() || '';
                const id = patient.id?.toString().toLowerCase() || '';
                return fullName.includes(lowerSearch) || email.includes(lowerSearch) || id.includes(lowerSearch);
            })
        };
    }, [data, debouncedSearch]);

    return (
        <div className="flex h-auto w-full flex-col gap-8 text-white">
            <Header
                data={filteredData}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <Table
                userType={userType}
                data={filteredData}
                pagination={pagination}
                fetchData={fetchData}
                isLoading={isLoading}
            />
        </div>
    );
};

export default PatientsSection;

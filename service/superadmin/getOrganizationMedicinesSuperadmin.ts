'use server';

import fetch from '@fetch';

import { OrganizationMedicine } from '../types';

const getOrganizationMedicinesSuperadmin = async (page: number = 1, limit: number = 10, branchId?: string): Promise<OrganizationMedicine> => {
    let url = `/api/v1/web/organization/medicine-superadmin?page=${page}&limit=${limit}`;

    if (branchId) {
        url += `&branch_id=${branchId}`;
    }

    const res = await fetch(url);

    const data = await res.json();

    return {
        data,
        success: res.ok,
    };
};

export default getOrganizationMedicinesSuperadmin;

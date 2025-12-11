'use server';

import fetch from '@fetch';

import type { GetPatientMedicationProps } from '../types';

async function exportPatientMedications(
    id: string
): Promise<GetPatientMedicationProps> {
    // Add query parameters to fetch all records (page=1&limit=100000)
    const params = new URLSearchParams();
    params.append('page', '1');
    params.append('limit', '100000');

    const url = `/api/v1/web/medications/patients/${id}?${params.toString()}`;

    const res = await fetch(url);

    const responseData = await res.json();

    return {
        success: res.ok,
        data: responseData.data || responseData,
        pagination: responseData.pagination || {
            totalItems: 0,
            perPage: 100000,
            currentPage: 1,
            totalPages: 0,
            hasNextPage: false,
            hasPrevPage: false,
            nextPage: null,
            prevPage: null,
        },
    };
}

export default exportPatientMedications;


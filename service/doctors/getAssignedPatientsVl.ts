'use server';

import fetch from '@fetch';

async function getAssignedPatientsVl(page: number = 1, perPage: number = 10): Promise<any> {
    const res = await fetch(`/api/v1/web/doctor/assigned-patients-vl?page=${page}&perPage=${perPage}`, {
        cache: 'no-store',
    });

    const data = await res.json();

    return {
        success: res.ok,
        data,
    };
}

export default getAssignedPatientsVl;

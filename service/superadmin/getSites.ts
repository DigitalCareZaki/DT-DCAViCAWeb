'use server';

import fetch from '@fetch';

import { SitesResponse } from '../types';

const getSites = async (
    page: number = 1,
    limit: number = 10,
    branchId?: string
): Promise<SitesResponse> => {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    if (branchId) {
        params.set('branchId', branchId);
    }

    const res = await fetch(`/api/v1/web/sites?${params.toString()}`);

    const data = await res.json();

    return {
        data,
        success: res.ok,
    };
};

export default getSites;

'use server';

import fetch from '@fetch';

import { SitesResponse } from '../types';

const getSites = async (page: number = 1, limit: number = 10): Promise<SitesResponse> => {
    const res = await fetch(`/api/v1/web/sites?page=${page}&limit=${limit}`);

    const data = await res.json();

    return {
        data,
        success: res.ok,
    };
};

export default getSites;

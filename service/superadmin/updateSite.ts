'use server';

import fetch from '@fetch';
import { CreateSiteProps } from '../types';

interface UpdateSitePayload {
    name: string;
    description: string;
    countryCode: string;
    address: string;
}

const updateSite = async (id: string, payload: string): Promise<CreateSiteProps> => {
    const res = await fetch(`/api/v1/web/sites/${id}`, {
        method: 'PATCH',
        body: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();

    return {
        success: res.ok,
        message: data?.message || (res.ok ? 'Site updated successfully' : 'Failed to update site'),
    };
};

export default updateSite;

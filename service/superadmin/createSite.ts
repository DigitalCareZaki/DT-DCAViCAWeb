'use server';

import fetch from '@fetch';
import { CreateSiteProps } from '../types';

const createSite = async (payload: string): Promise<CreateSiteProps> => {
    const res = await fetch('/api/v1/web/sites', {
        method: 'POST',
        body: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();

    return {
        success: res.ok,
        message: data?.message || (res.ok ? 'Site created successfully' : 'Failed to create site'),
    };
};

export default createSite;

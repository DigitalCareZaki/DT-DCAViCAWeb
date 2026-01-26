'use server';

import fetch from '@fetch';
import '@init-globals';
import { headers } from 'next/headers';
import type { AddDataProps } from '../types';

async function syncVivalink(id: string): Promise<AddDataProps> {
    try {
        const userType = headers().get('user-type') || 'organization';
        const res = await fetch(`/api/v1/web/${userType}/patient/sync/${id}`, {
            method: 'POST',
            cache: 'no-cache',
        });

        const body = await res.json();

        console.log('body >>>>', body);

        if (!res.ok) {
            throw new Error(body?.message?.toString() || 'Sync failed');
        }

        return {
            success: true,
            message: body?.message || 'Sync successful',
        };
    } catch (err: any) {
        return {
            success: false,
            message: err?.message || 'Sync failed. Please check the connection.',
        };
    }
}

export default syncVivalink;

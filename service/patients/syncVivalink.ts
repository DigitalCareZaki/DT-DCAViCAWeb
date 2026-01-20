'use server';

import fetch from '@fetch';
import '@init-globals';
import type { AddDataProps } from '../types';

async function syncVivalink(data: any): Promise<AddDataProps> {
    try {
        const res = await fetch(`/api/v1/vl/patient/sync`, {
            method: 'POST',
            cache: 'no-cache',
            body: JSON.stringify(data),
        });

        const body = await res.json();

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

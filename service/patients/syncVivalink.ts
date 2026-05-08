'use server';

import fetch from '@fetch';
import '@init-globals';
import { headers } from 'next/headers';
import type { AddDataProps } from '../types';

async function syncVivalink(id: string, role: string = 'PATIENT'): Promise<AddDataProps> {
    try {
        const userType = headers().get('user-type') || 'organization';
        const path = role === 'DOCTOR' ? 'doctor' : 'patient';
        const res = await fetch(`/api/v1/web/${userType}/${path}/sync/${id}`, {
            method: 'POST',
            cache: 'no-cache',
        });

        const body = await res.json();

        console.log('Sync ', body);

        if (!res.ok || body?.success === false) {
            throw new Error(body?.message?.toString() || body?.error?.toString() || 'Sync failed');
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

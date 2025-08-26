'use server';

import fetch from '@fetch';

import '@init-globals';

import type { AddDataProps } from '../types';

// payload must be base64 encoded (to match existing createDepartment pattern)
const updateDepartment = async (
    id: string,
    data: string
): Promise<AddDataProps> => {
    try {
        const decodedData = await JSON.parse(
            Buffer.from(data, 'base64').toString('utf-8')
        );

        const res = await fetch(`/api/v1/web/departments/${id}`, {
            method: 'PATCH',
            cache: 'no-cache',
            body: JSON.stringify(decodedData),
        });

        const body = await res.json();

        if (res.status !== 200) {
            throw new Error(body?.message?.toString());
        }

        return {
            success: true,
        };
    } catch (err: any) {
        return {
            success: false,
            message: err?.message,
        };
    }
};

export default updateDepartment;


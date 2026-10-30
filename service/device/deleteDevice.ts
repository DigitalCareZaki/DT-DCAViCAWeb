'use server';

import fetch from '@fetch';

const deleteDevice = async (deviceId: string): Promise<any> => {
    try {
        const res = await fetch(`/api/v1/web/devices/${deviceId}`, {
            method: 'DELETE',
            cache: 'no-cache',
        });

        const body = await res.json().catch(() => null);

        if (!res.ok) {
            throw new Error(body?.message?.toString() || 'Something went wrong');
        }

        return {
            success: true,
            data: body,
        };
    } catch (err: any) {
        return {
            success: false,
            data: null,
            message: err?.message,
        };
    }
};

export default deleteDevice;

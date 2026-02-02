'use server';

import fetch from '@fetch';

const syncDevice = async (deviceId: string): Promise<any> => {
    try {
        const res = await fetch(`/api/v1/web/devices/sync/${deviceId}`, {
            method: 'POST',
            cache: 'no-cache',
        });

        const body = await res.json();

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

export default syncDevice;

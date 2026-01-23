'use server';

import fetch from '@fetch';

import '@init-globals';

async function getSelectDoctorSlots(userId: string, date: string): Promise<any> {
    const res = await fetch(`/api/v1/web/telemed/slots?userId=${userId}&date=${date}`);

    const data = await res.json();

    return {
        data,
        success: res.ok,
    };
}

export default getSelectDoctorSlots;

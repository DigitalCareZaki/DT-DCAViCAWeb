'use server';

import fetch from '@fetch';

import '@init-globals';

async function getTelemedCardsNo(): Promise<any> {
    const res = await fetch('/api/v1/web/telemed/todayappointments'.convertURI());

    const data = await res.json();

    return {
        data,
        success: res.ok,
    };
}

export default getTelemedCardsNo;

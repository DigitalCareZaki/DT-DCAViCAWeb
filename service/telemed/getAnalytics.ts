'use server';

import fetch from '@fetch';


async function getAnalytics(
    page?: number,
    limit?: number,
): Promise<any> {

    const res = await fetch(
        `/api/v1/web/telemed/appointment-list?page=${page}&limit=${limit}`.convertURI()
    );

    const data = await res.json();

    return {
        data: data,
        success: res.ok,
    };
}

export default getAnalytics;

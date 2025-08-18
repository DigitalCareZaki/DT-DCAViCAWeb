'use server';

import fetch from '@fetch';


async function getAppointmentSuperAdmin(
    page?: number,
    limit?: number,
): Promise<any> {

    const res = await fetch(
        `/api/v1/web/telemed/organization-appointments?page=${page}&limit=${limit}`
    );

    const data = await res.json();

    return {
        data: data,
        success: res.ok,
    };
}

export default getAppointmentSuperAdmin;

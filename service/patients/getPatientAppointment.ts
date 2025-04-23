'use server';

import fetch from '@fetch';


async function getPatientAppointments(
    id: string,
    page?: number,
    limit?: number,
): Promise<any> {

    const res = await fetch(
        `/api/v1/web/telemed/patientappointments/${id}?page=${page}&limit=${limit}`.convertURI()
    );

    const data = await res.json();

    return {
        data: data,
        success: res.ok,
    };
}

export default getPatientAppointments;

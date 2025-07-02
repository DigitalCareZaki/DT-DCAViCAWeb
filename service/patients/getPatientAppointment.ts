'use server';

import fetch from '@fetch';


async function getPatientAppointments(
    patientId?: string,
    page?: number,
    limit?: number,
): Promise<any> {

    const res = await fetch(
        `/api/v1/web/telemed/patientappointments?patientId=${patientId}&page=${page}&limit=${limit}`
    );

    const data = await res.json();



    return {
        data: data,
        success: res.ok,
    };
}

export default getPatientAppointments;

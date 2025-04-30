'use server';

import fetch from '@fetch';

import type { GetPatientContacts } from '../types';

async function getPatientContactsForDoctor(
): Promise<GetPatientContacts> {
    const res = await fetch(
        `/api/v1/web/patient/contacts`.convertURI()
    );

    const data = await res.json();

    return {
        success: res.ok,
        data,
    };
}

export default getPatientContactsForDoctor;

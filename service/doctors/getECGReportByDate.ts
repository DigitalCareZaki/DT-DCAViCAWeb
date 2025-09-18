'use server';

import fetch from '@fetch';

async function getECGReportByDate(
    ecgRecordId: string,
    date: string
) {

    const res = await fetch(
        `/api/v1/web/uploader/ecg?date=${date}&deviceId=${ecgRecordId}`,
        {
            cache: 'no-store',
        }
    );

    const data = await res.json();

    return {
        success: res.ok,
        data: data,
    };
}

export default getECGReportByDate;

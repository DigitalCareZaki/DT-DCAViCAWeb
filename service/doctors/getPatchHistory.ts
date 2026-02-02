'use server';

import fetch from '@fetch';

export type PatchHistoryItem = {
    deviceId: string;
    timeAssigned: string;
    timeRemoved: string | null;
    duration: string;
};

export type GetPatchHistoryResponse = {
    success: boolean;
    data: PatchHistoryItem[];
};

async function getPatchHistory(patchSn: string): Promise<GetPatchHistoryResponse> {
    const res = await fetch(`/api/v1/web/doctor/patch-history?patchSn=${patchSn}`, {
        cache: 'no-store',
    });

    const data = await res.json();

    return {
        success: res.ok,
        data: data,
    };
}

export default getPatchHistory;

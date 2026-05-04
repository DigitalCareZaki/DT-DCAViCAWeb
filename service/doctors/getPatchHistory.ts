'use server';

import fetch from '@fetch';
import { GetPatchHistoryResponse } from '@types-services';

async function getPatchHistory(patchSn: string, userName: string): Promise<GetPatchHistoryResponse> {
    const params = new URLSearchParams({
        deviceId: patchSn,
        userName: userName,
    });

    const res = await fetch(`/api/v1/web/devices/history?${params.toString()}`, {
        cache: 'no-store',
    });

    const data = await res.json();
    console.log('Device Usage History API response:', {
        status: res.status,
        ok: res.ok,
        params: Object.fromEntries(params.entries()),
        data,
    });

    if (!res.ok) {
        return {
            success: false,
            data: [],
        };
    }

    let historyList: any[] = [];
    if (Array.isArray(data)) {
        historyList = data;
    } else if (data?.title && data?.startTime) {
        historyList = [data];
    }

    const mappedData = historyList
        .filter((item: any) => item?.title && item?.startTime)
        .map((item: any) => ({
            deviceId: item.title,
            timeAssigned: item.startTime,
            timeRemoved: item.active ? null : item.endTime,
            duration: item.durationHuman,
        }));

    return {
        success: true,
        data: mappedData,
    };
}

export default getPatchHistory;

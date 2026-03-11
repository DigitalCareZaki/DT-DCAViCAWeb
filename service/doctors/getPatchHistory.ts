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

    let historyList: any[] = [];
    if (Array.isArray(data)) {
        historyList = data;
    } else if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        historyList = [data];
    }

    const mappedData = historyList.map((item: any) => ({
        deviceId: item.title,
        timeAssigned: item.startTime,
        timeRemoved: item.active ? null : item.endTime,
        duration: item.durationHuman,
    }));

    return {
        // If we have mapped data, consider it a success regardless of status code, 
        // as the API might be returning data with a non-standard success code or we want to show partial data.
        success: res.ok || mappedData.length > 0,
        data: mappedData,
    };
}

export default getPatchHistory;

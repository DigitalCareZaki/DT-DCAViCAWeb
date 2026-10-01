'use server';

import fetch from '@fetch';

type GetAnalyticsParams = {
    page?: number;
    limit?: number;
    search?: string;
    date?: string; // YYYY-MM-DD
};

async function getAnalytics({
    page,
    limit,
    search,
    date,
}: GetAnalyticsParams = {}): Promise<any> {
    const params = new URLSearchParams();

    if (page) params.append('page', String(page));
    if (limit) params.append('limit', String(limit));
    if (search) params.append('search', search);
    if (date) params.append('date', date);

    const query = params.toString();

    const res = await fetch(
        `/api/v1/web/telemed/appointment-list${query ? `?${query}` : ''}`,
        { cache: 'no-store' }
    );

    const data = await res.json();

    return {
        data: data,
        success: res.ok,
    };
}

export default getAnalytics;

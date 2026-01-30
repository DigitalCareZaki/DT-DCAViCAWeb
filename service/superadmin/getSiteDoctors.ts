'use server';

import fetch from '@fetch';
import type { SelectUserProps } from '@types';

interface SiteDoctorsResponse {
    success: boolean;
    data: SelectUserProps[];
}

const getSiteDoctors = async (siteId: string): Promise<SiteDoctorsResponse> => {
    const res = await fetch(`/api/v1/web/organization/site-doctors?siteId=${siteId}`);

    const data = await res.json();

    return {
        success: res.ok,
        data,
    };
};

export default getSiteDoctors;

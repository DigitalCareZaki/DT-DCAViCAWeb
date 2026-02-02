'use server';

import fetch from '@fetch';
import { SiteProps } from '@types';

export type GetDoctorSitesResponse = {
    success: boolean;
    data: SiteProps | SiteProps[] | null;
};

const getDoctorSites = async (): Promise<GetDoctorSitesResponse> => {
    const res = await fetch(`/api/v1/web/doctor/get-siteId`);

    const data = await res.json();

    return {
        data,
        success: res.ok,
    };
};

export default getDoctorSites;

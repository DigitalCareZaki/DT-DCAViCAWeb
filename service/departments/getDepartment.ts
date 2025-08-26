'use server';

import fetch from '@fetch';

import '@init-globals';

const getDepartment = async (id: string): Promise<{ success: boolean; data?: any }> => {
    const res = await fetch(`/api/v1/web/departments/${id}`);
    const data = await res.json();
    return { success: res.ok, data };
};

export default getDepartment;


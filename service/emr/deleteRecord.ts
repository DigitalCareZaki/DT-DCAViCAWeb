'use server';

import fetch from '@fetch';

async function deleteRecord(id: string): Promise<any> {
    try {
        const res = await fetch(`/api/v1/web/emr/${id}`, {
            method: 'DELETE',
            cache: 'no-cache',
        });

        if (res.status !== 200) {
            throw new Error('Failed to delete record');
        }

        return {
            success: true,
        };
    } catch (err) {
        return {
            success: false,
        };
    }
}

export default deleteRecord;

// Mark a message as read by ID
'use server';

import fetch from '@fetch';

export async function readThread(messageId: string) {
    const res = await fetch(`/api/v1/web/message/update/${messageId}`.convertURI(), {
        method: 'PATCH',
        cache: 'no-cache',
    });
    const data = await res.json();
    return {
        success: res.ok,
        data,
    };
}
export default readThread;

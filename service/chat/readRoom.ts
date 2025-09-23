'use server';

import fetch from '@fetch';

import '@init-globals';

async function readRoom(roomId: string): Promise<{ success: boolean }> {
    try {
        const res = await fetch(`/api/v1/web/chat/room/${roomId}/read`, {
            method: 'POST',
            cache: 'no-cache',
        });

        return { success: res.ok };
    } catch {
        return { success: false };
    }
}

export default readRoom;



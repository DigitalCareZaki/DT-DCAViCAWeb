import { setSelectedRoomReducer } from '@slice';

export const openOrCreateRoom = async (dispatch: any, option: any) => {
    let userId = option.users?.[0]?.id || option.id;
    if (!option.id) {
        if (userId) {
            const data = { user_id: userId };
            const res = await fetch('/api/v1/web/chat/create-room', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (result?.data?.id) {
                dispatch(
                    setSelectedRoomReducer({
                        room: { id: result.data.id, users: result.data.users ?? [] },
                    })
                );
            }
        }
    } else {
        dispatch(setSelectedRoomReducer({ room: option }));
    }
};

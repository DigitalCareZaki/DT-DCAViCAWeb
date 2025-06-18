import { setSelectedRoomReducer, setRoomsReducer } from '@slice';

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
                const newRoom = { id: result.data.id, users: result.data.users ?? [] };
                dispatch((dispatch: any, getState: any) => {
                    const rooms = getState().chats.rooms;
                    const exists = rooms.some((room: any) => room.id === newRoom.id);
                    if (!exists) {
                        dispatch(setRoomsReducer({ rooms: [...rooms, newRoom] }));
                    }
                    dispatch(setSelectedRoomReducer({ room: newRoom }));
                });
                return newRoom;
            }
        }
    } else {
        dispatch(setSelectedRoomReducer({ room: option }));
        return option;
    }
};

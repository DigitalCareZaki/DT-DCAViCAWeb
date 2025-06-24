import { setSelectedRoomReducer, setRoomsReducer } from '@slice';
import { createRoom } from '@service';

export const openOrCreateRoom = async (dispatch: any, option: any) => {
    let userId = option.users?.[0]?.id;
    console.log('option >>>', option);
    console.log('user id  Check>>>>', userId);

    if (userId) {
        const data = { user_id: userId };
        console.log('data user Id kia a rahe han>>>', data);
        const result = await createRoom(btoa(JSON.stringify(data)));

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
    else {
        dispatch(setSelectedRoomReducer({ room: option }));
        return option;
    }
};

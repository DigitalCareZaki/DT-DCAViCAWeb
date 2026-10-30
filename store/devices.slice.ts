import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    devices: [],
};

const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        setDevices(state, action) {
            state.devices = action.payload;
        },
        removeDevice(state, action) {
            state.devices = state.devices.filter((device: any) => device.id !== action.payload);
        },
    },
});

export const { setDevices, removeDevice } = devicesSlice.actions;
export default devicesSlice.reducer; 
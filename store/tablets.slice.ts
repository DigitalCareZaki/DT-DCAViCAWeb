import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tablets: [],
};

const tabletsSlice = createSlice({
    name: 'tablets',
    initialState,
    reducers: {
        setTablets(state, action) {
            state.tablets = action.payload;
        },
    },
});

export const { setTablets } = tabletsSlice.actions;
export default tabletsSlice.reducer; 
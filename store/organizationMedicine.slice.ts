import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Use the correct OrganizationMedicineProps from types/data.d.ts
import type { OrganizationMedicineProps } from '../types/data';

interface OrganizationMedicineState {
    medicines: OrganizationMedicineProps[];
}

const initialState: OrganizationMedicineState = {
    medicines: [],
};

const organizationMedicineSlice = createSlice({
    name: 'organizationMedicine',
    initialState,
    reducers: {
        setOrganizationMedicines(state, action: PayloadAction<OrganizationMedicineProps[]>) {
            state.medicines = action.payload;
        },
        addOrganizationMedicine(state, action: PayloadAction<OrganizationMedicineProps>) {
            state.medicines.unshift(action.payload);
        },
    },
});

export const { setOrganizationMedicines, addOrganizationMedicine } = organizationMedicineSlice.actions;
export default organizationMedicineSlice.reducer;

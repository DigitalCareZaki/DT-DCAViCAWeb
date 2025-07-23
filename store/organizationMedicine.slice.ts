import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Use the correct OrganizationMedicineProps from types/data.d.ts
import type { OrganizationMedicineProps, PaginationProps } from '../types/data';

interface OrganizationMedicineState {
    medicines: OrganizationMedicineProps[];
    pagination: PaginationProps;
}

const initialState: OrganizationMedicineState = {
    medicines: [],
    pagination: {} as PaginationProps
};

const organizationMedicineSlice = createSlice({
    name: 'organizationMedicine',
    initialState,
    reducers: {
        setOrganizationMedicines(state, action: PayloadAction<{ data: OrganizationMedicineProps[], pagination: PaginationProps }>) {
            state.medicines = action.payload.data;
            state.pagination = action.payload.pagination;
        },
        addOrganizationMedicine(state, action: PayloadAction<OrganizationMedicineProps>) {
            state.medicines.unshift(action.payload);
        },
    },
});

export const { setOrganizationMedicines, addOrganizationMedicine } = organizationMedicineSlice.actions;
export default organizationMedicineSlice.reducer;

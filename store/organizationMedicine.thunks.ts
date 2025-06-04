import { setOrganizationMedicines, addOrganizationMedicine } from '../store/organizationMedicine.slice';
import apiGetOrganizationMedicines from '../service/superadmin/getOrganizationMedicines';
import addAdminOrganizationMedicine from '../service/superadmin/addAdminMedicines';
import type { OrganizationMedicineProps } from '../types/data';

// Thunk to fetch all medicines
export const fetchOrganizationMedicines = () => async (dispatch: any) => {
    const res = await apiGetOrganizationMedicines();
    if (res.success) {
        dispatch(setOrganizationMedicines(res.data));
    }
};

// Thunk to add a new medicine and update store
export const addOrganizationMedicineAndUpdate = (medicine: string) => async (dispatch: any) => {
    const res = await addAdminOrganizationMedicine(btoa(JSON.stringify({ name: medicine })));
    if (res.success) {
        // After adding, fetch the updated list
        const fetchRes = await apiGetOrganizationMedicines();
        if (fetchRes.success) {
            dispatch(setOrganizationMedicines(fetchRes.data));
        }
    }
    return res;
};

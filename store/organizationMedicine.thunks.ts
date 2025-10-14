import { setOrganizationMedicines, addOrganizationMedicine } from '../store/organizationMedicine.slice';
import apiGetOrganizationMedicines from '../service/superadmin/getOrganizationMedicines';
import apiGetOrganizationMedicinesSuperadmin from '../service/superadmin/getOrganizationMedicinesSuperadmin';
import addAdminOrganizationMedicine from '../service/superadmin/addAdminMedicines';
import addAdminOrganizationMedicineSuperadmin from '../service/superadmin/addAdminMedicinesSuperadmin';
import { updateAdminOrganizationMedicine } from '../service/superadmin/addAdminMedicines';
import type { OrganizationMedicineProps } from '../types/data';

// Thunk to fetch all medicines
export const fetchOrganizationMedicines = (page: number = 1, limit: number = 10) => async (dispatch: any) => {
    const res = await apiGetOrganizationMedicines(page, limit);
    if (res.success) {
        dispatch(setOrganizationMedicines(res.data));
    }
};

// Thunk to fetch medicines for superadmin with branch filter
export const fetchOrganizationMedicinesSuperadmin = (page: number = 1, limit: number = 10, branchId?: string) => async (dispatch: any) => {
    const res = await apiGetOrganizationMedicinesSuperadmin(page, limit, branchId);
    if (res.success) {
        dispatch(setOrganizationMedicines(res.data));
    }
};

// Thunk to add a new medicine and update store
export const addOrganizationMedicineAndUpdate = (medicine: string) => async (dispatch: any) => {
    const res = await addAdminOrganizationMedicine(btoa(JSON.stringify({ name: medicine })));
    if (res.success) {
        // After adding, fetch the updated list using regular API for realtime updates
        dispatch(fetchOrganizationMedicines(1, 10));
    }
    return res;
};

// Thunk to add a new medicine with branch for superadmin and update store
export const addOrganizationMedicineAndUpdateSuperadmin = (medicine: string, branchId?: string) => async (dispatch: any) => {
    const payload: any = { name: medicine };
    if (branchId) {
        payload.branch_id = branchId;
    }

    const res = await addAdminOrganizationMedicineSuperadmin(btoa(JSON.stringify(payload)));
    if (res.success) {
        // After adding, fetch the updated list using regular API for realtime updates
        dispatch(fetchOrganizationMedicines(1, 10));
    }
    return res;
};

// Thunk to update a medicine and update store
export const updateOrganizationMedicineAndUpdate = (medicineId: string, name: string) => async (dispatch: any) => {
    const res = await updateAdminOrganizationMedicine(medicineId, name);
    if (res.success) {
        // After updating, fetch the updated list using regular API for realtime updates
        dispatch(fetchOrganizationMedicines(1, 10));
    }
    return res;
};

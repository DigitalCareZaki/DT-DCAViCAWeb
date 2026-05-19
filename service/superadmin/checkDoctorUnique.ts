'use server';

import fetch from '@fetch';

import '@init-globals';

export type DoctorUniqueField =
  | 'email'
  | 'phone_number'
  | 'npi_number'
  | 'pmdc_number';

export type CheckDoctorUniqueParams = Partial<Record<DoctorUniqueField, string>>;

export type DoctorUniqueFieldResult = {
  checked: boolean;
  exists: boolean;
  message: string | null;
};

type CheckDoctorUniqueResult = {
  success: boolean;
  available: boolean;
  fields: Record<DoctorUniqueField, DoctorUniqueFieldResult>;
  message?: string;
};

const emptyFields: Record<DoctorUniqueField, DoctorUniqueFieldResult> = {
  email: {
    checked: false,
    exists: false,
    message: null,
  },
  phone_number: {
    checked: false,
    exists: false,
    message: null,
  },
  npi_number: {
    checked: false,
    exists: false,
    message: null,
  },
  pmdc_number: {
    checked: false,
    exists: false,
    message: null,
  },
};

async function checkDoctorUnique(
  data: CheckDoctorUniqueParams
): Promise<CheckDoctorUniqueResult> {
  try {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      const cleanValue = value?.trim();

      if (cleanValue) {
        params.set(key, cleanValue);
      }
    });

    if (!params.toString()) {
      return {
        success: true,
        available: true,
        fields: emptyFields,
      };
    }

    const res = await fetch(
      `/api/v1/web/organization/doctor/check-unique?${params.toString()}`,
      {
        method: 'GET',
        cache: 'no-cache',
      }
    );

    const body = await res.json();

    if (res.status !== 200) {
      throw new Error(body?.message?.toString() || 'Something went wrong');
    }

    return {
      success: true,
      available: body?.available ?? true,
      fields: {
        ...emptyFields,
        ...(body?.fields ?? {}),
      },
    };
  } catch (err: any) {
    return {
      success: false,
      available: true,
      fields: emptyFields,
      message: err?.message,
    };
  }
}

export default checkDoctorUnique;

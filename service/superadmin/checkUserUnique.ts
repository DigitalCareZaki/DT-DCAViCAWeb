'use server';

import fetch from '@fetch';

import '@init-globals';

export type UserUniqueRole = 'ADMIN' | 'PATIENT' | 'NURSE' | 'DOCTOR';

export type UserUniqueField =
  | 'email'
  | 'phone_number'
  | 'username'
  | 'npi_number'
  | 'pmdc_number';

export type CheckUserUniqueParams = Partial<Record<UserUniqueField, string>> & {
  role: UserUniqueRole;
};

export type UserUniqueFieldResult = {
  checked: boolean;
  exists: boolean;
  message: string | null;
};

type CheckUserUniqueResult = {
  success: boolean;
  available: boolean;
  fields: Record<UserUniqueField, UserUniqueFieldResult>;
  message?: string;
};

const emptyFields: Record<UserUniqueField, UserUniqueFieldResult> = {
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
  username: {
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

async function checkUserUnique(
  data: CheckUserUniqueParams
): Promise<CheckUserUniqueResult> {
  try {
    const params = new URLSearchParams();

    params.set('role', data.role);

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'role') return;

      const cleanValue = value?.trim();

      if (cleanValue) {
        params.set(key, cleanValue);
      }
    });

    const res = await fetch(
      `/api/v1/web/organization/user/check-unique?${params.toString()}`,
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

export default checkUserUnique;

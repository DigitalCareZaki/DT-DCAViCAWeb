'use server';

import fetch from '@fetch';

import type { ValidateAppointment } from '../types';

import '@init-globals';

async function validateAppointment(id: string): Promise<ValidateAppointment> {
  try {
    const res = await fetch(
      `/api/v1/web/telemed/validate-meeting/${id}`,
      {
        cache: 'no-cache',
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data?.message);

    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
}

export default validateAppointment;

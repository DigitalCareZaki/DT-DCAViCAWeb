'use server';

import fetch from '@fetch';

import type { GetCurrentPatientProfile } from '../types';

async function getCurrentPatientProfile(): Promise<GetCurrentPatientProfile> {
  const res = await fetch(`/api/v1/web/patient/profile`);

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default getCurrentPatientProfile;

'use server';

import fetch from '@fetch';
import type { GetDoctorProfileProps } from '../types';

async function getDoctorProfile(
  userType: string
): Promise<GetDoctorProfileProps> {
  const res = await fetch(`/api/v1/web/${userType}/profile`);

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default getDoctorProfile;

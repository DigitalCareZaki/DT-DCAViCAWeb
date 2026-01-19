'use server';

import fetch from '@fetch';
import type { GetDoctorProfileProps } from '../types';

async function getDoctorProfile(
  userType: string
): Promise<GetDoctorProfileProps> {
  // Always fetch the latest profile data so that recently updated
  // fields (especially the profile picture URI) are reflected
  // whenever the doctor/profile page is opened.
  const res = await fetch(`/api/v1/web/${userType}/profile`, {
    cache: 'no-store',
  });

  const data = await res.json();

  return {
    data,
    success: res.ok,
  };
}

export default getDoctorProfile;

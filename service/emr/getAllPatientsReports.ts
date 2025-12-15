'use server';

import fetch from '@fetch';
import '@init-globals';

async function getAllPatientsReports(page: any, limit: any, search?: string) {
  let url = `/api/v1/web/doctor/all-reports?page=${page}&limit=${limit}`;

  if (search) {
    url += `&search=${search}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  return { success: res.ok, data };
}

export default getAllPatientsReports;


// // old code
//   const res = await fetch(`/api/v1/web/doctor/all-reports`);
//   const data = await res.json();
//   return { success: res.ok, data};
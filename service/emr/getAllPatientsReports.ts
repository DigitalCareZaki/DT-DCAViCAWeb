'use server';

import fetch from '@fetch';
import '@init-globals';

async function getAllPatientsReports(page = 1, limit = 10) {
  const url = `/api/v1/web/doctor/all-reports?page=${page}&limit=${limit}`;
  const res = await fetch(url.convertURI());
  const data = await res.json();

  return { success: res.ok, data };
}

export default getAllPatientsReports;


// // old code
//   const res = await fetch(`/api/v1/web/doctor/all-reports`.convertURI());
//   const data = await res.json();
//   return { success: res.ok, data};
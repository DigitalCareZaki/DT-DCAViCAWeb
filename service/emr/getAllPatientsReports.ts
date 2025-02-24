'use server';

import fetch from '@fetch';
import '@init-globals';

async function getAllPatientsReports(){
  const res = await fetch(`/api/v1/web/doctor/all-reports`.convertURI());
  const data = await res.json();
  return { success: res.ok, data};
}

export default getAllPatientsReports;

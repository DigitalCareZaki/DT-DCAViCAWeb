'use server';

import fetch from '@fetch';
import type { GetSearchDoctor } from './types';

async function selectNurseRoleSpecitlity(): Promise<any> {
  const res = await fetch(
    `/api/v1/web/nurse/speciality`
  );

  const data = await res.json();

  return {
    success: res.ok,
    data,
  };
}

export default selectNurseRoleSpecitlity;

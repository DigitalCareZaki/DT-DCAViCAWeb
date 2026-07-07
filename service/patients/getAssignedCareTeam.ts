'use server';

import fetch from '@fetch';

export type CareTeamMember = {
  id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  title: string | null;
  role: 'DOCTOR' | 'NURSE';
  uri: string | null;
};

export type AssignedCareTeam = {
  primary_doctor: CareTeamMember | null;
  primary_nurse: CareTeamMember | null;
};

async function getAssignedCareTeam(): Promise<{
  data: AssignedCareTeam | null;
  success: boolean;
}> {
  try {
    const res = await fetch('/api/v1/web/patient/assigned-care-team', {
      cache: 'no-store',
    });

    if (!res.ok) {
      return { data: null, success: false };
    }

    return {
      data: (await res.json()) as AssignedCareTeam,
      success: true,
    };
  } catch {
    return { data: null, success: false };
  }
}

export default getAssignedCareTeam;

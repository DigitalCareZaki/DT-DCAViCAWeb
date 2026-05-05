
'use server';

import fetchWrapper from '@fetch';
import type { UserProps } from '@types';

async function getUser(): Promise<UserProps | undefined> {
  const { cookies } = await import('next/headers');
  const token = cookies().get('jwt')?.value || '';

  const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/jwt-verify`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const user = await res.json();

  const role = user?.role?.toLowerCase?.();
  if (role) {
    try {
      const profileRes = await fetchWrapper(`/api/v1/web/${role}/profile`, {
        cache: 'no-store',
      });

      if (profileRes.ok) {
        const profilePayload = await profileRes.json();
        const profile = profilePayload?.data ?? profilePayload;
        const firstName = profile?.first_name ?? user?.first_name ?? '';
        const middleName = profile?.middle_name ?? user?.middle_name ?? '';
        const lastName = profile?.last_name ?? user?.last_name ?? '';
        const name = [firstName, middleName, lastName].filter(Boolean).join(' ');

        return {
          ...user,
          ...profile,
          role: user?.role ?? profile?.role,
          type: user?.role ?? profile?.role,
          name: name.trim(),
        } as UserProps;
      }
    } catch (err) {
      // Fall back to JWT payload when profile fetch fails.
    }
  }

  return {
    ...user,
    type: user.role,
    name: `${user.first_name} ${user.middle_name || ''} ${user.last_name}`,
  };
}

export default getUser;

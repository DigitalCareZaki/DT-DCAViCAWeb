'use server';

import type { UserProps } from '@types';

async function getUser(): Promise<UserProps | undefined> {
  const { cookies } = await import('next/headers');
  const token = cookies().get('jwt')?.value || '';

  console.log('token >>>>>>>>>>>>>>>>> ', token);
  const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/jwt-verify`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const user = await res.json();

  return {
    ...user,
    type: user.role,
    name: `${user.first_name} ${user.middle_name || ''} ${user.last_name}`,
  };
}

export default getUser;

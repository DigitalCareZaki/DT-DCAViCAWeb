'use server';

import fetch from '@fetch';

import type { UserProps } from '@types';

async function getUser(): Promise<UserProps | undefined> {
  const res = await fetch('/api/jwt-verify'.convertURI(true));

  const user = await res.json();

  return {
    ...user,
    type: user.role,
    name: `${user.first_name} ${user.middle_name || ''} ${user.last_name}`,
  };
}

export default getUser;

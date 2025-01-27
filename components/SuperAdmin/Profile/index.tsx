'use server';

import { PrimaryProfile } from '@common';

import type { ServerComponent } from '@types';

const ProfileWrapper: ServerComponent = async () => {
  return <PrimaryProfile />;
};

export default ProfileWrapper;

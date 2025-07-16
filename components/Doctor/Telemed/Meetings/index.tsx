'use server';

import { TelemedMeetings } from '@common';
import { getUserTypeHeaders } from '@actions';
import type { UserRole } from "@types";

import type { ServerComponent } from '@types';

const Meetings: ServerComponent = async () => {

  const userTypeRes = await getUserTypeHeaders();

  return <TelemedMeetings userType={userTypeRes as UserRole} />;
};

export default Meetings;

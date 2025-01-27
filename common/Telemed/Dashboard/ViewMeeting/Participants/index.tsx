'use server';

import { ServerGenerator } from '@common';

import User from './User';

import type { ServerComponentProps } from '@types';
import type { ParticipantsProps } from './types';

const Participants: ServerComponentProps<ParticipantsProps> = async ({
  participants,
}) => {
  return (
    <div className="hidescrollbar flex h-[60vh] w-[20%] flex-col gap-2 overflow-y-scroll rounded-2xl bg-white p-4">
      <span className="mb-4 font-bold text-gray-500">Participants</span>
      <ServerGenerator data={participants}>
        <User />
      </ServerGenerator>
    </div>
  );
};

export default Participants;

'use server';

import dynamic from 'next/dynamic';

import { validateAppointment, joinMeeting } from '@service';

import Participants from './Participants';
import Discussion from './Discussion';
import Topbar from './Topbar';
import Control from './Control';
import Counter from './Counter';
import VitalsServerWrapper from './Vitals/ServerWrapper';
import Error from './Error';

const AgoraCall = dynamic(() => import('./AgoraCall'), {
  ssr: false,
});

import type { ServerComponentProps } from '@types';
import type { MeetingProps } from './types';

const Meeting: ServerComponentProps<MeetingProps> = async ({ id }) => {
  const res = await validateAppointment(id);

  if (!res.success) {
    return <Error />;
  }

  await joinMeeting(id);

  return (
    <div className="grid h-screen grid-cols-4 gap-4 !bg-[#161b20]">
      <div className="col-span-3 flex h-full w-full flex-col gap-2">
        <div className="h-[10%]">
          <Topbar id={id} />
        </div>
        <div className="flex flex-col flex-grow relative">
          <AgoraCall id={id} />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
            <Counter />
            <Control id={id} />
          </div>
        </div>
      </div>
      <div className="col-span-1 flex h-full w-full flex-col gap-2 ">
        <Participants id={id} />
        <Discussion id={id} />
      </div>
      <VitalsServerWrapper id={id} />
    </div>
  );
};

export default Meeting;

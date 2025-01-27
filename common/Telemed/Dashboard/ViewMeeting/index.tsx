'use server';

import { getTelemedDetails } from '@service';

import Header from '../components/Header';
import Topbar from './Topbar';
import Participant from './Participants';
import Discussion from './Discussion';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const ViewMeeting: ServerComponentProps<Props> = async ({ id }) => {
  const res = await getTelemedDetails(id);

  return (
    <div className="hidescrollbar flex h-full w-full flex-col gap-6 overflow-y-scroll px-4">
      <Header />
      <Topbar {...res.data} appointment_id={id} />
      <div className="flex h-[60vh] w-full items-center gap-4">
        <Participant participants={res.data.participants} />
        <div className="h-[60vh] w-[50%] rounded-2xl bg-white p-4 ">
          <span className="font-bold text-gray-500">Medication</span>
        </div>
        <Discussion id={id} />
      </div>
    </div>
  );
};

export default ViewMeeting;

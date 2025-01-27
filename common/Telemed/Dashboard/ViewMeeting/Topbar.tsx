'use server';

import { FaUsers } from '@react-icons/all-files/fa/FaUsers';
import { getUser } from '@actions';

import UpdateStatus from './UpdateStatus';
import Counter from './Counter';
import { getName } from '@init-globals';

import type { ServerComponentProps, TelemedDetailsProps } from '@types';

const Topbar: ServerComponentProps<
  TelemedDetailsProps & { appointment_id: string }
> = async ({ ...data }) => {
  const user = await getUser();

  return (
    <div className="relative h-[30rem] w-full shrink-0 rounded-2xl">
      {data.organizer_id === user?.id && (
        <div className="absolute right-4 top-4 z-[9999]">
          <UpdateStatus id={data.appointment_id} />
        </div>
      )}
      <div className="absolute bottom-4 left-3 z-[99] flex flex-wrap items-center gap-4">
        <div className="flex h-fit w-fit items-center justify-center gap-2 rounded-full bg-white/20 p-2 px-4 text-xs font-bold text-fuchsia-100">
          <FaUsers size={20} />
          <span>{data?.participants?.length} Participants</span>
        </div>
        <div className="flex h-fit w-fit items-center justify-center gap-2 rounded-full bg-white/20 p-2 px-4 text-xs font-bold text-fuchsia-100">
          <FaUsers size={20} />
          <div className="flex items-center gap-1">
            <span>End at</span>
            <span>
              {new Date(data?.start_date ?? Date()).toLocaleTimeString(
                'en-US',
                {
                  localeMatcher: 'best fit',
                  hour: 'numeric',
                  minute: 'numeric',
                  day: 'numeric',
                  month: 'short',
                  // dateStyle: 'short',
                }
              )}
            </span>
          </div>
        </div>
        <div className="flex h-fit w-fit items-center justify-center gap-2 rounded-full bg-white/20 p-2 px-4 text-xs font-bold text-fuchsia-100">
          <div className="flex items-center gap-1">
            <span>Meeting type</span>
            <span>{data.type}</span>
          </div>
        </div>
        <div className="flex h-fit w-fit items-center justify-center gap-2 rounded-full bg-white/20 p-2 px-4 text-xs font-bold text-fuchsia-100">
          <div className="flex items-center gap-1">
            <span>Meeting about</span>
            <span>{data.about}</span>
          </div>
        </div>
        <div className="flex h-fit w-fit items-center justify-center gap-2 rounded-full bg-white/20 p-2 px-4 text-xs font-bold text-fuchsia-100">
          <div className="flex items-center gap-1">
            <span>Status</span>
            <span>{data.status}</span>
          </div>
        </div>
        <div className="flex h-fit w-fit items-center justify-center gap-2 rounded-full bg-white/20 p-2 px-4 text-xs font-bold text-fuchsia-100">
          <div className="flex items-center gap-1">
            <span>Organizer</span>
            <span>
              {getName({
                ...data?.organizer,
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute z-[9] h-full w-full rounded-2xl bg-black/30" />
      <Counter
        start_date={data?.start_date}
        title={data.title}
        description={data.description}
        id={data.appointment_id}
        status={data.status}
      />
    </div>
  );
};

export default Topbar;

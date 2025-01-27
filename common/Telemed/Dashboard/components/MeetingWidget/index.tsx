'use client';

import { MdTimelapse } from '@react-icons/all-files/md/MdTimelapse';
import { ClientGenerator } from '@common';
import { useUser } from '@selectors';

import Participant from './Participant';

import type { ClientComponentProps, SelfAppointmentProps } from '@types';
import Link from 'next/link';

const MeetingWidget: ClientComponentProps<SelfAppointmentProps> = ({
  title,
  description,
  type,
  about,
  start_date,
  end_date,
  participants,
  created_at,
  id,
}) => {
  const [user] = useUser();

  return (
    <div className="hidescrollbar flex h-80 w-full flex-col gap-4 overflow-y-scroll rounded-xl border-2 border-transparent bg-fuchsia-200/20 p-4 shadow-2xl shadow-fuchsia-900/20 backdrop-blur-lg transition duration-200 hover:border-fuchsia-300 hover:shadow-fuchsia-900/50 sm:p-5 md:p-6">
      <div className="flex flex-col">
        <span className="text-base font-bold uppercase text-fuchsia-950 sm:text-lg">
          {title}
        </span>
        <span className="text-xs font-semibold text-fuchsia-300 sm:text-sm">
          {description}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="h-fit w-fit rounded-full bg-white/20 p-2 px-4 text-[10px] font-bold text-fuchsia-200 sm:text-xs">
          <span>{type}</span>
        </div>
        <div className="h-fit w-fit rounded-full bg-white/20 p-2 px-4 text-[10px] font-bold text-fuchsia-200 sm:text-xs">
          <span>{about}</span>
        </div>
        <div className="flex h-fit w-fit items-center gap-1 rounded-full bg-white/20 p-2 px-3 text-[8px] font-bold text-fuchsia-200 sm:text-[10px]">
          <MdTimelapse size={16} />
          <span>
            Starts at{' '}
            {new Date(start_date ?? Date()).toLocaleTimeString('en-US', {
              localeMatcher: 'best fit',
              hour: 'numeric',
              minute: 'numeric',
              day: 'numeric',
              month: 'short',
            })}
          </span>
        </div>
        <div className="flex h-fit w-fit items-center gap-1 rounded-full bg-white/20 p-2 px-3 text-[8px] font-bold text-fuchsia-200 sm:text-[10px]">
          <MdTimelapse size={16} />
          <span>
            Ends at{' '}
            {new Date(end_date ?? Date()).toLocaleTimeString('en-US', {
              localeMatcher: 'best fit',
              hour: 'numeric',
              minute: 'numeric',
              day: 'numeric',
              month: 'short',
            })}
          </span>
        </div>
        <div className="flex h-fit w-fit items-center gap-1 rounded-full bg-white/20 p-2 px-3 text-[8px] font-bold text-fuchsia-200 sm:text-[10px]">
          <MdTimelapse size={16} />
          <span>
            Created at{' '}
            {new Date(created_at ?? Date()).toLocaleTimeString('en-US', {
              localeMatcher: 'best fit',
              hour: 'numeric',
              minute: 'numeric',
              day: 'numeric',
              month: 'short',
            })}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 pb-6">
        <ClientGenerator data={participants ?? []}>
          <Participant />
        </ClientGenerator>
      </div>
      <Link
        passHref
        href={`/${user.role?.toLowerCase()}/telemed/meetings/view/${id}`}
      >
        <button className="h-10 w-full shrink-0 rounded-lg bg-fuchsia-800 text-xs font-bold text-fuchsia-100 outline-none sm:h-11 sm:text-sm">
          View
        </button>
      </Link>
    </div>
  );
};

export default MeetingWidget;

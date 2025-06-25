'use server';

import { fetchMeetingMetadata } from '@service';

import type { ServerComponentProps } from '@types';
import type { TopbarProps } from './types';

const Topbar: ServerComponentProps<TopbarProps> = async ({ id }) => {
  const res = await fetchMeetingMetadata(id);

  if (!res.success) return <></>;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col text-ssx mx-3 mt-2 text-gray-400/80">
        <span className="text-xs font-semibold text-white">{new Date().toDateString()}</span>
        <span className="text-lg font-semibold text-white">
          {res.data?.title}
        </span>
        <span className="truncate text-xs font-semibold text-white/60">
          {res.data?.description}
        </span>
      </div>

      <div className="flex items-center gap-2 font-semibold text-white">
        <span>Invited</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-blue-100">
          +{res.data?.participants?.length}
        </div>
      </div>
    </div>
  );
};

export default Topbar;

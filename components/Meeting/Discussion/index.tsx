'use client';

import Discussions from './Discussion';
import Form from './Form';

import type { DiscussionProps } from './types';

export default function Discussion({ id }: DiscussionProps) {
  // TODO: If you need to fetch data, use useEffect or SWR here.
  // For now, just render a placeholder with the id.
  return (
    <div className="flex h-[28rem] w-full flex-grow-0 flex-col justify-between gap-4 rounded-xl bg-dark-secondary p-5">
      <div className="flex w-full shrink-0 flex-col">
        <span className=" font-semibold text-white">Discussion</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Recording</span>
          <div className="relative flex h-3 w-3 items-center justify-center rounded-full">
            <div className="theme-bg-color h-2 w-2 rounded-full" />
            <div className="theme-bg-color absolute h-2 w-2 animate-ping rounded-full" />
          </div>
        </div>
      </div>
      <Discussions />
      <Form id={id} />
    </div>
  );
}

'use client';

import type { TopbarProps } from './types';

export default function Topbar({ id }: TopbarProps) {
  // TODO: If you need to fetch data, use useEffect or SWR here.
  // For now, just render a placeholder with the id.
  return (
    <div className="flex items-center h-full px-4">
      <span className="text-lg font-semibold">Meeting Topbar - ID: {id}</span>
    </div>
  );
}

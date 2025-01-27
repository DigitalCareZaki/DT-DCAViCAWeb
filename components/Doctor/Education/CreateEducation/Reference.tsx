'use client';

import type { ClientComponentProps } from '@types';

const Reference: ClientComponentProps<Props> = ({
  title,
  pos,
  handlePopReference,
}) => {
  return (
    <div className="theme-bg-color group group flex w-fit cursor-pointer items-center justify-between gap-4  rounded-2xl p-2 px-4 text-xs text-white transition-all duration-300 ease-in-out hover:px-6">
      <span className="overflow-clip truncate text-ellipsis max-w-14">{title}</span>
      <div
        onClick={() => handlePopReference?.call(this, pos ?? 0)}
        className="theme-text-color invisible flex h-4 w-4 scale-0 cursor-pointer items-center justify-center rounded-full bg-white font-bold opacity-0 transition-all duration-500 ease-in-out group-hover:visible group-hover:scale-100 group-hover:opacity-100"
      >
        x
      </div>
    </div>
  );
};

interface Props {
  title?: string;
  pos?: number;
  handlePopReference?: (pos: number) => void;
}

export default Reference;

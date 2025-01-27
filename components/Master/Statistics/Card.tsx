'use server';

import dynamic from 'next/dynamic';

const PrimaryCounter = dynamic(
  () => import('../../../common/Counter/Primary'),
  {
    ssr: false,
  }
);

import type { ServerComponentProps } from '@types';

const Card: ServerComponentProps<{ title: string; value: number }> = async ({
  title,
  value,
}) => {
  return (
    <div className="flex flex h-60 w-full flex-col items-center justify-center rounded-lg bg-black">
      <span className="text-6xl font-black text-white">
        <PrimaryCounter value={value ?? 0} prefix="" />
      </span>
      <span className="text-xs font-semibold text-white">{title}</span>
    </div>
  );
};

export default Card;

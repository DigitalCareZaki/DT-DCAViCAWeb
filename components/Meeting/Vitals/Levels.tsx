'use client';

import { ClientGenerator } from '@common';
import Watch from './Watch';

import type { ClientComponentProps } from '@types';
import type { LevelsProps } from './types';

const Levels: ClientComponentProps<LevelsProps> = ({ data }) => {
  return (
    <div className="flex w-full items-center justify-center gap-10">
      <ClientGenerator data={data}>
        <Watch />
      </ClientGenerator>
    </div>
  );
};

export default Levels;

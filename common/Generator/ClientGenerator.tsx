'use client';

import { cloneElement } from 'react';

import type { ClientComponentProps } from '@types';
import type { GeneratorProps } from './types';

const ClientGenerator: ClientComponentProps<GeneratorProps> = ({
  data,
  children,
  ...props
}) => {
  return (
    <>
      {data != null && data!.map((el, i) =>
        cloneElement(children!, {
          key: i,
          ...el,
          ...props,
          index: i,
        })
      )}
    </>
  );
};

export default ClientGenerator;

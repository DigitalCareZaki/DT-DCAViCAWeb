'use server';

import { cloneElement } from 'react';

import type { ServerComponentProps } from '@types';
import type { GeneratorProps } from './types';

const ClientGenerator: ServerComponentProps<GeneratorProps> = async ({
  data,
  children,
  ...props
}) => {
  return (
    <>
      {data != null && data!.map((el, i) =>
        cloneElement(children!, {
          ...el,
          ...props,
        })
      )}
    </>
  );
};

export default ClientGenerator;

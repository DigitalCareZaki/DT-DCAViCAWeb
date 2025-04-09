'use server';

import { cloneElement } from 'react';

import type { ServerComponentProps } from '@types';
import type { GeneratorProps } from './types';

const ClientGenerator: ServerComponentProps<any> = async ({
  data,
  children,
  ...props
}) => {
  return (
    <>
      {data != null && data.map((el: any, i: number) =>
        cloneElement(children!, {
          key: i, // <- assign unique key here (preferably el.id)
          ...el,
          ...props,
        })
      )}
    </>
    // <>
    //   {data != null && data!.map((el, i) =>
    //     cloneElement(children!, {
    //       ...el,
    //       ...props,
    //     })
    //   )}
    // </>
  );
};

export default ClientGenerator;

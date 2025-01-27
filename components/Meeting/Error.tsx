'use server';

import Image from 'next/image';
import Background from '../../assets/images/abstract-background.svg';
import NotFound from '../../assets/images/not-found.svg';

import { ServerComponent } from '@types';

const Error: ServerComponent = async () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center font-semibold text-white">
      <div className="absolute flex h-full w-full items-center justify-center">
        <div className="absolute bottom-[22rem] z-20 flex flex-col items-center">
          <div className="relative h-96 w-96">
            <Image
              src={NotFound}
              alt="not-found"
              fill
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-xs font-bold">
            This meeting does not exists or {"you're"} not the participants of
            this meeting
          </span>
        </div>
        <div className="flex h-full w-full">
          <Image
            src={Background}
            alt="background"
            fill
            className="bottom-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Error;

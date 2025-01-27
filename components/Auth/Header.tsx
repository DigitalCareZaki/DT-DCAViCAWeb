'use server';

import { LogoPrimary, LogoMain } from '@common';

export default async function Header(): Promise<JSX.Element> {
  return (
    <div className="flex w-full items-center justify-between gap-6">
      <div className="flex flex-col">
        <LogoPrimary />
      </div>
      <div className="flex flex-col gap-4 text-center">
        <h1 className="font-poppins text-2xl font-bold text-t-color-primary">
          Aman Ventures brings Avica
        </h1>
        <span className="text-sm font-medium text-t-color-secondary">
          {`"`}A holistic platform for patient monitoring, education, <br />{' '}
          empowerment, engagement and compliance!{`"`}
        </span>
      </div>
      <div>
        <LogoMain variant="large" />
      </div>
    </div>
  );
}

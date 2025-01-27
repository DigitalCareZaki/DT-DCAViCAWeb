'use server';

import Link from 'next/link';

import { LogoMain, LogoPrimary, ModalBottom } from '@common';

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  return (
    <div className="relative flex h-screen w-screen overflow-y-scroll bg-background">
      <div className="slinted absolute -left-[10%] flex h-full w-[60%] flex-col items-center bg-primary " />
      <div className="z-[9] flex w-[40%] flex-col items-center justify-between pb-10 ">
        <div className="-mt-10 flex w-full flex-col items-center">
          <LogoMain variant="xl" svgColor="white" />
          <div className="-mt-14 flex flex-row items-center gap-4">
            <span className="font-semibold text-white">a product of</span>
            <Link target="_blank" href={'https://amanventuresus.com/'}>
              <LogoPrimary variant="small" svgColor="white" />
            </Link>
          </div>
        </div>
        <div className="flex w-[60%] flex-col gap-4 text-white">
          <span>
            Avica is an integerated digital health platform which enables
            continuum of care for patients and providers
          </span>
          <span>
            This product is licenced from Aman Ventures Platform, AV (a US
            corporation) 2023, as AVICA | All rights reserved
          </span>
        </div>
        <div className="flex w-full flex-col items-center gap-4 text-white">
          <div className="flex flex-row items-center gap-2">
            <span className="opacity-70">HealthTech Partner: </span>
            <Link target="_blank" href="https://digital-care.net/">
              Digital Care
            </Link>
          </div>
          <Link target="_blank" href="https://digital-care.net/">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[30px]">
              <span className="text-primary">D</span>
              <span className="-ml-3 text-red-500">C</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="ml-40 flex w-1/2 flex-col items-center justify-center bg-background">
        {children}
      </div>
      <ModalBottom />
    </div>
  );
}

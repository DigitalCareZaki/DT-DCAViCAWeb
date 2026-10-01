'use server';

import Link from 'next/link';

import { LogoMain, LogoPrimary, ModalBottom } from '@common';

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  return (
    <div className="relative flex h-screen w-screen flex-col overflow-y-scroll bg-background lg:flex-row">
      <div className="slinted absolute -left-[10%] hidden h-full w-[60%] flex-col items-center bg-primary lg:flex" />
      {/* Below lg this panel uses display: contents so its sections can be
          reordered around the form: logo, form, then about + partner. */}
      <div className="contents w-[40%] flex-col items-center justify-between pb-10 lg:z-[9] lg:flex">
        <div className="-mt-10 flex w-full flex-col items-center bg-primary pb-6 lg:bg-transparent lg:pb-0">
          <LogoMain variant="xl" svgColor="white" />
          <div className="-mt-14 flex flex-row items-center gap-4">
            <span className="font-semibold text-white">a product of</span>
            <Link target="_blank" href={'https://amanventuresus.com/'}>
              <LogoPrimary variant="small" svgColor="white" />
            </Link>
          </div>
        </div>
        <div className="order-2 flex w-full flex-col items-center gap-8 bg-primary px-6 py-10 lg:contents">
          <div className="flex w-full flex-col gap-4 text-center text-white sm:w-[80%] lg:w-[60%] lg:text-left">
            <span>
              Avica is an integrated digital health platform which enables
              continuum of care for patients and providers
            </span>
            <span>
              This product is licensed from Aman Ventures Platform, AV (a US
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
      </div>
      <div className="order-1 flex w-full flex-col items-center justify-center bg-background py-10 lg:order-none lg:ml-40 lg:w-1/2 lg:py-0">
        {children}
      </div>
      <ModalBottom />
    </div>
  );
}

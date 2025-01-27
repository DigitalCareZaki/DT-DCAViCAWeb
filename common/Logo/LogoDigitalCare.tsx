'use server';

import Image from 'next/image';
import { logoDigitalCare } from '@assets';

export default async function LogoDigitalCare(): Promise<JSX.Element> {
  return (
    <div className="w-52 h-20 relative">
      <Image
        src={logoDigitalCare}
        alt="logo-digital-care"
        className="w-full h-full object-cover"
        fill
      />
    </div>
  );
}

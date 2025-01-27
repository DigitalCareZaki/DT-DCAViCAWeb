'use server';

import Image from 'next/image';
import { logoSecondary } from '@assets';

export default async function LogoSecondary(): Promise<JSX.Element> {
  return (
    <div className="w-40 h-32 relative">
      <Image
        src={logoSecondary}
        alt="logo-secondary"
        className="w-full h-full object-contain"
        fill
      />
    </div>
  );
}

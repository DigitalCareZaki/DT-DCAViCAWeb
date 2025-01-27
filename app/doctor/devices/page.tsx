import type { Metadata } from 'next';

import { Devices } from '@components';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <Devices patient={null} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Device',
  description: 'Avica | Device',
};
import type { Metadata } from 'next';

import { Tablets } from '@components';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <Tablets patient={null} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Tablets',
  description: 'Avica | Tablets',
};

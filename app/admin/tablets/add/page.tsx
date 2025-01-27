import type { Metadata } from 'next';

import { CreateTablet } from '@components';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <CreateTablet data={undefined} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Create Tablet',
  description: 'Avica | Create Tablet',
};

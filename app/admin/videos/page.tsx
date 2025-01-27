import type { Metadata } from 'next';

import { Videos } from '@components';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <Videos />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Videos',
  description: 'Avica | Videos',
};

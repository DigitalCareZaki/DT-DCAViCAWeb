import type { Metadata } from 'next';

import { AddVideos } from '@components';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <AddVideos />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Add Videos',
  description: 'Avica | Add Videos',
};

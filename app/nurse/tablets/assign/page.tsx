import type { Metadata } from 'next';

import { AssignTablet } from '@components';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <AssignTablet />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Assign Tablet',
  description: 'Avica | Assign Tablet',
};

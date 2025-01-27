import type { Metadata } from 'next';

import { AssignDevice } from '@components';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <AssignDevice />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Assign Device',
  description: 'Avica | Assign Device',
};

import { Metadata } from 'next';

import { Meeting } from '@components';

import type { PageProps } from '@types';

export default function Page({ params }: PageProps): JSX.Element {
  return (
    <main className="flex h-full min-h-0 w-full flex-col p-6">
      <Meeting id={params?.appointment?.toString() ?? ''} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Patient Appointment Live',
  description: 'Avica | Patient Appointment Live',
};

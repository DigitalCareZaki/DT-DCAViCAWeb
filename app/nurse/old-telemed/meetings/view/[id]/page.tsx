import { ViewMeeting } from '@components';
import { Metadata } from 'next';

import type { PageProps } from '@types';

export default function Page({ params }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <ViewMeeting id={params?.id?.toString() ?? ''} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Nurse TeleMed',
  description: 'Avica | Nurse TeleMed',
};

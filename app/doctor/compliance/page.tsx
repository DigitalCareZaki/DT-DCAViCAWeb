import { DoctorCompliance } from '@components';

import { Metadata } from 'next';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <DoctorCompliance />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Doctor Compliance',
  description: 'Avica | Doctor Compliance',
};

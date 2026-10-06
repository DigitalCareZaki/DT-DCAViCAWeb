import { NurseCompliance } from '@components';
import { Metadata } from 'next';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <NurseCompliance />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Nurse Compliance',
  description: 'Avica | Nurse Compliance',
};

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
  title: 'Avica | Doctor Compliance',
  description: 'Avica | Doctor Compliance',
};

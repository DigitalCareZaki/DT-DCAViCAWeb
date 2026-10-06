import { NurseProfile } from '@components';
import { Metadata } from 'next';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <NurseProfile />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Nurse Profile',
  description: 'Avica | Nurse Profile',
};

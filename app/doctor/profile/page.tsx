import { DoctorProfile } from '@components';
import { Metadata } from 'next';

export default function Page(): JSX.Element {
  return (
    <main className="w-full h-full">
      <DoctorProfile />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Doctor Profile',
  description: 'Avica | Doctor Profile',
};

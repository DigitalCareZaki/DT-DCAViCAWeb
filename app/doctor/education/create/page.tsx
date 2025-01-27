import { Metadata } from 'next';
import { DoctorCreateEducation } from '@components';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <DoctorCreateEducation />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Add Education Article',
  description: 'Avica | Add Education Article',
};

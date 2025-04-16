import { DoctorTelemedAddMeeting } from '@components';
import { Metadata } from 'next';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <DoctorTelemedAddMeeting />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Doctor TeleMed',
  description: 'Avica | Doctor TeleMed',
};

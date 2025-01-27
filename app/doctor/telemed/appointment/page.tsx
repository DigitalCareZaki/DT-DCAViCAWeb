import { DoctorTelemed } from '@components';
import { Metadata } from 'next';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      {/* <DoctorTelemed /> */}
      <span>Appointment</span>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Doctor TeleMed Appointment',
  description: 'Avica | Doctor TeleMed Appointment',
};

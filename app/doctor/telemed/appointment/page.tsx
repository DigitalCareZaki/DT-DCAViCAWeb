import { DoctorTelemed } from '@components';
import { Metadata } from 'next';

export default function Page(): JSX.Element {
  return (
    <main className="fixed inset-0 w-full h-full bg-[#f6fcfc] overflow-auto">
      <DoctorTelemed />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Doctor TeleMed Appointment',
  description: 'Avica | Doctor TeleMed Appointment',
};

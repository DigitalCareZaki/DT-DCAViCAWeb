import { DoctorViewAppointment } from '@components';
import { Metadata } from 'next';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <DoctorViewAppointment />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Nurse View Appointment',
  description: 'Avica | Nurse View Appointment',
};

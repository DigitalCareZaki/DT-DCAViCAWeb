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
  title: 'Avica | Doctor View Appointment',
  description: 'Avica | Doctor View Appointment',
};

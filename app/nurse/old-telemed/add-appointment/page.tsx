import { Metadata } from 'next';
import { DoctorAddAppointment } from '@components';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <DoctorAddAppointment />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Nurse Add Appointment',
  description: 'Avica | Nurse Add Appointment',
};

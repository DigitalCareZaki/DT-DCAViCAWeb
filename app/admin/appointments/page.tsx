import { Metadata } from 'next';

import { AdminAppointments } from '@components';

export default function Page(): JSX.Element {
    return (
        <main className="h-full w-full">
            <AdminAppointments />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Avica | Appointments',
    description: 'Avica | Appointments Management',
};

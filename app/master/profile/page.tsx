import { SuperAdminProfile } from '@components';
import { Metadata } from 'next';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <SuperAdminProfile />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Doctor Profile',
  description: 'Avica | Doctor Profile',
};

import { Metadata } from 'next';

import { ChangePassword } from '@common';

export default function Page(): JSX.Element {
  return (
    <main className="h-full w-full">
      <ChangePassword />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Doctor Change Password',
  description: 'Avica | Doctor Change Password',
};

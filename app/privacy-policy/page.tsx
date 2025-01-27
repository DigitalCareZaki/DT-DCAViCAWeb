import { Metadata } from 'next';

import { PrivacyPolicy } from '@components';

export const metadata: Metadata = {
  title: 'Avica | Privacy Policy',
  description: 'Privacy Policy',
};

export default function Page() {
  return (
    <main className="h-screen w-screen overflow-y-scroll bg-background">
      <PrivacyPolicy />
    </main>
  );
}

import { Metadata } from 'next';

import { TermsAndCondition } from '@components';

export const metadata: Metadata = {
  title: 'Avica | Terms and conditions',
  description: 'Terms and conditions',
};

export default function Page() {
  return (
    <main className="h-screen w-screen overflow-y-scroll bg-background">
      <TermsAndCondition />
    </main>
  );
}

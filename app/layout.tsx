import type { Metadata } from 'next';

import { StoreProvider } from '@providers';
import '@init-globals';

import { getUserTypeHeaders } from './actions';

import './globals.css';

export const metadata: Metadata = {
  title: 'Avica',
  description: 'Avica Dashboard',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await getUserTypeHeaders();

  return (
    <html lang="en" className={res?.toLowerCase()}>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

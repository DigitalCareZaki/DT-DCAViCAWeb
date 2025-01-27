import type { Metadata } from 'next';

import { PincodeProvider, StoreProvider, WebSocketProvider } from '@providers';
import { AdminLayout } from '@layouts';

import { getUser } from '../actions';

export const metadata: Metadata = {
  title: 'Avica | Admin',
  description: 'Avica | Admin',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await getUser();

  return (
    <html lang="en" className={res?.type?.toLowerCase() ?? ''}>
      <body>
        <StoreProvider>
          <WebSocketProvider user={res}>
            <AdminLayout user={res}>
              <PincodeProvider user={res}>{children}</PincodeProvider>
            </AdminLayout>
          </WebSocketProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

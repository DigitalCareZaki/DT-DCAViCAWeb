import type { Metadata } from 'next';

import { PincodeProvider, StoreProvider, WebSocketProvider } from '@providers';
import { MasterLayout } from '@layouts';

import { getUser } from '../actions';

export const metadata: Metadata = {
  title: 'Avica | Master',
  description: 'Avica | Master',
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
            <MasterLayout user={res}>
              <PincodeProvider user={res}>{children}</PincodeProvider>
            </MasterLayout>
          </WebSocketProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

import { PincodeProvider, StoreProvider, WebSocketProvider } from '@providers';
import { NurseLayout } from '@layouts';

import { getUser } from '../actions';

export const metadata: Metadata = {
  title: 'Avica | Nurse',
  description: 'Avica | Nurse',
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
            <NurseLayout user={res}>
              <PincodeProvider user={res}>{children}</PincodeProvider>
            </NurseLayout>
          </WebSocketProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

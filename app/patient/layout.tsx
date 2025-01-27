import type { Metadata } from 'next';

import { PincodeProvider, StoreProvider, WebSocketProvider } from '@providers';
import { PatientLayout } from '@layouts';

import { getUser } from '../actions';

export const metadata: Metadata = {
  title: 'Avica | Patient',
  description: 'Avica | Patient',
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
            <PatientLayout user={res}>
              <PincodeProvider user={res}> {children}</PincodeProvider>
            </PatientLayout>
          </WebSocketProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

export const revalidate = 3600;

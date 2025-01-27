import type { Metadata } from 'next';

import { PincodeProvider, StoreProvider, WebSocketProvider } from '@providers';
import { DoctorLayout } from '@layouts';

import { getUser } from '../actions';

export const metadata: Metadata = {
  title: 'Avica | Doctor',
  description: 'Avica | Doctor',
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
            <DoctorLayout user={res}>
              <PincodeProvider user={res}>{children}</PincodeProvider>
            </DoctorLayout>
          </WebSocketProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

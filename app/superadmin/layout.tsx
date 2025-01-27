import type { Metadata } from 'next';

import { PincodeProvider, StoreProvider, WebSocketProvider } from '@providers';
import { SuperAdminLayout } from '@layouts';
import { getCurrentOrganization } from '@service';

import { getUser } from '../actions';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await getUser();
  const organization = await getCurrentOrganization();

  return (
    <html lang="en" className={res?.type?.toLowerCase() ?? ''}>
      <body>
        <StoreProvider>
          <WebSocketProvider user={res}>
            <SuperAdminLayout user={res} organization={organization.data}>
              <PincodeProvider user={res}>{children}</PincodeProvider>
            </SuperAdminLayout>
          </WebSocketProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Super Admin',
  description: 'Avica | Super Admin',
};

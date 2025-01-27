import type { Metadata } from 'next';
import { StoreProvider } from '@providers';
import { LandingLayout } from '@layouts';

export const metadata: Metadata = {
  title: 'Avica | Forgot your password?',
  description: 'Forgot your password?',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <LandingLayout>{children}</LandingLayout>
        </StoreProvider>
      </body>
    </html>
  );
}

import { SuperAdminUsers } from '@components';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="w-full">
      <SuperAdminUsers role={searchParams?.role?.toString() ?? ''} />
    </main>
  );
}

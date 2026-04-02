import { SuperAdminUsers } from '@components';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full min-h-0 w-full overflow-hidden">
      <SuperAdminUsers role={searchParams?.role?.toString() ?? ''} />
    </main>
  );
}

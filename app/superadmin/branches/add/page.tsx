import { SuperAdminAddBranch } from '@components';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full">
      <SuperAdminAddBranch />
    </main>
  );
}

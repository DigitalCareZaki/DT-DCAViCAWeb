import { getUser } from '@actions';

import { PatientHome } from '@components';

import type { PageProps } from '@types';

export default async function Page({ searchParams }: PageProps) {
  const user = await getUser();
  const type = searchParams?.type?.toString() || 'ALL';

  if (!user?.id) return <></>;

  return (
    <main className="h-full w-full">
      <PatientHome patient={user.id} type={type} />
    </main>
  );
}

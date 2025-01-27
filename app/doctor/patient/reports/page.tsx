import { EMR } from '@components';

import type { PageProps } from '@types';

export default function Page({ searchParams }: PageProps): JSX.Element {
  return (
    <main className="h-full w-full px-4">
      <EMR patient_id={searchParams?.patient?.toString()} />
    </main>
  );
}

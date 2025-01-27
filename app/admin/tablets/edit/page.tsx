import type { Metadata } from 'next';

import { getSingleTablet } from '@service';

import { CreateTablet as EditTablet } from '@components';

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}): Promise<JSX.Element> {
  const tabletId = searchParams?.id;

  if (!tabletId || tabletId === '') return <></>;

  const res = await getSingleTablet(tabletId);

  if (!res.success) return <></>;

  return (
    <main className="h-full w-full">
      <EditTablet data={res.data} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Edit Tablet',
  description: 'Avica | Edit Tablet',
};

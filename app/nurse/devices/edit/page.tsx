import type { Metadata } from 'next';

import { getSingleDevice } from '@service';

import { CreateDevice as EditDevice } from '@components';

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}): Promise<JSX.Element> {
  const deviceId = searchParams?.id;

  if (!deviceId || deviceId === '') return <></>;

  const res = await getSingleDevice(deviceId);

  if (!res.success) return <></>;

  return (
    <main className="h-full w-full">
      <EditDevice data={res.data} />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Avica | Edit Device',
  description: 'Avica | Edit Device',
};

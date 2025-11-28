import type { Metadata } from 'next';

import { getSingleTablet } from '@service';

import { EditAccessory } from '@components';

export default async function Page({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined };
}): Promise<JSX.Element> {
    const tabletId = searchParams?.id;

    if (!tabletId || tabletId === '') return <></>;

    const res = await getSingleTablet(tabletId);

    console.log('id componut>>>>', res.data);

    if (!res.success) return <></>;

    return (
        <main className="h-full w-full">
            <EditAccessory data={res.data} />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Avica | Edit Accessory',
    description: 'Avica | Edit Accessory',
};

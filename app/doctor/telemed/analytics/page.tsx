import { Metadata } from 'next';
import { AnalyticsWrapper } from '@components';

import { PrimaryHeader, ServerGenerator } from '@common';
import { BiLoaderAlt } from 'react-icons/bi';
import type { PageProps } from '@types';
import { getUser } from '@service';
export default async function Page() {

    const user = await getUser();

    return (
        <main className="h-full w-full">
            <div className="flex !h-full w-full flex-col gap-6 px-4">
                {user ? (
                    <PrimaryHeader user={user as any} />
                ) : (
                    <BiLoaderAlt />
                )}
            </div>
            <AnalyticsWrapper />
        </main>

    );
}

export const metadata: Metadata = {
    title: 'Avica | Analytics',
    description: 'Avica | Analytics',
};

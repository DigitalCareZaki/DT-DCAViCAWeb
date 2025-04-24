import { Metadata } from 'next';
import { AnalyticsWrapper } from '@components';
import { getUser } from '@service';

import type { PageProps } from '@types';
import { PrimaryHeader, ServerGenerator } from '@common';
import { BiLoaderAlt } from 'react-icons/bi';
export default async function Page() {
    const user = await getUser();


    return (
        <div className=" flex h-full w-full flex-col gap-6 px-4">
            {user ? (
                <PrimaryHeader user={user as any} />
            ) : (
                <BiLoaderAlt />
            )}
            <AnalyticsWrapper />
        </div>
    );
}

export const metadata: Metadata = {
    title: 'Avica | Analytics',
    description: 'Avica | Analytics',
};

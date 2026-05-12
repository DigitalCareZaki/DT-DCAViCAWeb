'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { ButtonPrimary } from '@common';
import SearchBar from './SearchBar';
import Table from './Table';

import type { VideoProps } from '@types';

interface VideosClientProps {
    data: VideoProps[];
    userRole?: string;
}

const VideosClient: React.FC<VideosClientProps> = ({ data, userRole }) => {
    const [filteredData, setFilteredData] = useState<VideoProps[]>(data);

    // Sync filteredData when data prop changes (e.g., when videos are loaded)
    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    return (
        <div className="flex h-full w-full flex-col gap-6 px-10 pr-0 pt-6">
            <div className="flex w-full justify-between px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-end gap-4">
                    {/* <span className="text-xl screen-title font-semibold text-gray-800 sm:text-2xl lg:text-3xl">
                        Videos
                    </span> */}
                    <SearchBar data={data} onSearchResults={setFilteredData} />
                </div>

                {userRole && (
                    <div className="w-40 sm:w-40">
                        <Link passHref href={`/${userRole.toLowerCase()}/videos/add`}>
                            <ButtonPrimary
                                title="Add Video"
                                name="Add video"
                                className="h-12 px-4 py-2 text-lg sm:text-xs lg:text-xl"
                            />
                        </Link>
                    </div>
                )}
            </div>
            <Table data={filteredData || []} />
        </div>
    );
};

export default VideosClient;

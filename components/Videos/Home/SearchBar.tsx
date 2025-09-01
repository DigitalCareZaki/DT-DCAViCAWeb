'use client';

import { useState, useMemo } from 'react';

import { InputBasic } from '@common';

import type { VideoProps } from '@types';

interface SearchBarProps {
    data: VideoProps[];
    onSearchResults: (results: VideoProps[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ data, onSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = useMemo(() => {
        if (!searchTerm.trim()) {
            return data;
        }

        const lowerSearchTerm = searchTerm.toLowerCase();

        return data.filter((video) => {
            return (
                video.title.toLowerCase().includes(lowerSearchTerm) ||
                video.description.toLowerCase().includes(lowerSearchTerm) ||
                video.category.toLowerCase().includes(lowerSearchTerm) ||
                video.priority.toLowerCase().includes(lowerSearchTerm) ||
                `${video.author.first_name} ${video.author.last_name}`.toLowerCase().includes(lowerSearchTerm)
            );
        });
    }, [data, searchTerm]);

    // Update parent component with filtered results
    useMemo(() => {
        onSearchResults(filteredData);
    }, [filteredData, onSearchResults]);

    return (
        <div className="w-full max-w-md">
            <InputBasic
                icon="IoSearch"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                borderTheme
                inputWrapperClassName="bg-white"
                inputClassName="bg-white"
            />
        </div>
    );
};

export default SearchBar;

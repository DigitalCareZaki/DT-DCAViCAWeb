'use client';

import { useState, useEffect } from 'react';

import { InputBasic } from '@common';

import type { VideoProps } from '@types';

interface SearchBarProps {
    data: VideoProps[];
    onSearchResults: (results: VideoProps[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ data, onSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Debounced search with 300ms delay
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!searchTerm.trim()) {
                onSearchResults(data);
                return;
            }

            const lowerSearchTerm = searchTerm.toLowerCase();

            const filteredData = data.filter((video) => {
                return (
                    video.title.toLowerCase().includes(lowerSearchTerm) ||
                    video.description.toLowerCase().includes(lowerSearchTerm) ||
                    video.category.toLowerCase().includes(lowerSearchTerm) ||
                    video.priority.toLowerCase().includes(lowerSearchTerm) ||
                    `${video.author.first_name} ${video.author.last_name}`.toLowerCase().includes(lowerSearchTerm)
                );
            });

            onSearchResults(filteredData);
        }, 300); // 300ms debounce delay

        // Cleanup function to clear timeout if user keeps typing
        return () => clearTimeout(timeoutId);
    }, [data, searchTerm]); // Removed onSearchResults from dependencies to prevent infinite loop

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

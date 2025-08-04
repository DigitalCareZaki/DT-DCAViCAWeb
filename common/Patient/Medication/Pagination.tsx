'use client';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import type { FC } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    nextPage?: number | null;
    prevPage?: number | null;
}

const Pagination: FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
}) => {
    return (
        <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3">
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => onPageChange(prevPage || currentPage - 1)}
                    disabled={!hasPrevPage}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaArrowLeft className="h-4 w-4" />
                </button>

                <span className="text-sm font-medium text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => onPageChange(nextPage || currentPage + 1)}
                    disabled={!hasNextPage}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaArrowRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default Pagination; 
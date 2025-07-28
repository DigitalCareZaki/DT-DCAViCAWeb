'use client';

import type { FC } from 'react';

interface ItemsPerPageSelectorProps {
    itemsPerPage: number;
    onItemsPerPageChange: (itemsPerPage: number) => void;
    options?: number[];
}

const ItemsPerPageSelector: FC<ItemsPerPageSelectorProps> = ({
    itemsPerPage,
    onItemsPerPageChange,
    options = [5, 10, 20, 50],
}) => {
    return (
        <div className="flex items-center space-x-2">
            <label htmlFor="items-per-page" className="text-sm text-gray-700">
                Show:
            </label>
            <select
                id="items-per-page"
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <span className="text-sm text-gray-700">entries</span>
        </div>
    );
};

export default ItemsPerPageSelector; 
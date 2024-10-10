import React from 'react';
import { useDataTableContext } from './context/TableContext';
import { TableSearch as Props } from './types';

const TableSearch: React.FC<Props> = ({ onSearch }) => {
	const { searchQuery, setSearchQuery } = useDataTableContext();

	const handleSearch = (search: string) => {
		setSearchQuery(search);

		if (onSearch) {
			onSearch(search);
		}
	};

	return (
		<div className="flex sm:justify-end mb-2 relative">
			<input
				type="text"
				placeholder="Filter..."
				value={searchQuery}
				onChange={(e) => handleSearch(e.target.value)}
				className="border border-gray-300 rounded p-2 w-full md:w-96"
			/>
			<button
				onClick={() => handleSearch('')}
				className="absolute top-3 right-2 bg-gray-100 hover:bg-gray-50 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-full h-5 w-5 leading-none"
				aria-label="Clear search field"
			>
				&times;
			</button>
		</div>
	);
};

export default TableSearch;

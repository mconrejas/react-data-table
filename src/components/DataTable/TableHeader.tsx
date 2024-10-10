import React from 'react';
import { useDataTableContext } from './context/TableContext';
import { Column, TableHeader as Props } from './types';

const TableHeader: React.FC<Props> = ({ onSortChange }) => {
  const { columns, sortField, setSortField } = useDataTableContext();
  
  const renderSortIcon = (field: string) => {
		if (!sortField || sortField.field !== field) return <span className="text-gray-400 absolute top-auto right-4">↕</span>;

		return sortField.direction === 'asc' ? (
			<span className="text-gray-600 absolute top-auto right-4">↑</span>
		) : (
			<span className="text-gray-600 absolute top-auto right-4">↓</span>
		);
	};
		
  const handleSort = (field: string) => {
		const direction = sortField?.field === field && sortField.direction === 'asc' ? 'desc' : 'asc';
		
		setSortField({ field, direction });

		if ( onSortChange ) {
			onSortChange({ field, direction });
		}
  };

  return (
    <div className='datatable-row flex flex-row w-max md:w-full'>
      {columns.map((column: Column, key: number) => (
        <div
          key={key}
          onClick={() => column.sortable && handleSort(column.field)}
          className={`datatable-column relative py-3 px-4 text-center text-sm font-medium min-w-40 w-full text-gray-600 ${column.sortable ? 'cursor-pointer hover:bg-gray-200' : ''} ${key !== columns.length - 1 ? 'border-r' : ''}`}
        >
          {column.label} {column.sortable && renderSortIcon(column.field)}
        </div>
      ))}
    </div>
  );
};

export default TableHeader;

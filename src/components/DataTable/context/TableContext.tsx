import React, { createContext, useContext, useMemo, useState } from 'react';
import { Column, Data, TableContext as Props, SortField } from '../types';

const TableContext = createContext<Props | undefined>(undefined);

export const TableProvider: React.FC<{ 
  data: Data[];
  columns: Column[];
  isServerSide?: boolean;
  children: React.ReactNode;
}> = ({
  data,
  columns,
  isServerSide,
  children
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <TableContext.Provider
      value={{
        data,
        columns,
        currentPage,
        pageSize,
        sortField,
        searchQuery,
        isServerSide,
        setCurrentPage,
        setPageSize,
        setSortField,
        setSearchQuery,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useDataTableContext = () => {
  const context = useContext(TableContext);

  if (!context) throw new Error('useDataTableContext must be used within a TableProvider');

  const {
    data,
    isServerSide,
    searchQuery,
    sortField,
    currentPage,
    pageSize,
  } = context;

  const filteredData = useMemo(() => {
		if (isServerSide) return data;

		return searchQuery ? data.filter((item) =>
		  Object.values(item).some((value) =>	value.toString().toLowerCase().includes(searchQuery.toLowerCase()))
		) : data;
	}, [data, isServerSide, searchQuery]);

	const sortedData = useMemo(() => {
		if (isServerSide || !sortField) return filteredData;

		const { field, direction } = sortField;
		
		return [...filteredData].sort((a, b) => {
		  const aValue = a[field];
		  const bValue = b[field];
		  const comparison = typeof aValue === 'string' && typeof bValue === 'string'
			? aValue.localeCompare(bValue)
			: aValue - bValue;
		  return direction === 'asc' ? comparison : -comparison;
		});
	  }, [filteredData, sortField, isServerSide]);
	
	const processedData = useMemo(() => {
		return isServerSide ? sortedData : sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
	}, [isServerSide, sortedData, currentPage, pageSize]);

  return {
    ...context,
    data: processedData,
  };
};

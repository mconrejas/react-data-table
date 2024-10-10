import React from 'react';
import { Column, Data } from './types';
import { useDataTableContext } from './context/TableContext';

const TableRow: React.FC = () => {
  const { data, columns } = useDataTableContext();

  return (
    <>
      { data.map((rowData: Data, key: number) => (
        <div 
          key={key} 
          className="datatable-row flex flex-row hover:bg-gray-50 w-max md:w-full"
        >
          {columns.map((column: Column, key: number) => (
            <div 
              key={key} 
              className={`datatable-column border-b py-3 px-4 text-sm text-gray-700 min-w-40 w-full ${column.className}`}
            >
              {
                column.renderer
                ? column.renderer({ cellData: rowData[column.field as keyof Data], rowData})
                : rowData[column.field]
              }
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default TableRow;

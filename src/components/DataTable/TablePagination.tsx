import React from 'react';
import { useDataTableContext } from './context/TableContext';
import { TablePagination as Props } from './types';

const TablePagination: React.FC<Props> = ({
  pageSizes,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) => {

  const { currentPage, pageSize, setCurrentPage, setPageSize } = useDataTableContext();
  
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    if (onPageChange) {
      onPageChange(page);
    }
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);

    handlePageChange(1);
    
    if (onPageSizeChange) {
      onPageSizeChange(size);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center sm:justify-between p-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm">Rows per page:</span>
        <select
          className="border border-gray-300 rounded w-14 p-1 cursor-pointer bg-gray-100 hover:bg-gray-50"
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
        >
          {pageSizes && pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <button className='border border-gray-300 rounded w-8 cursor-pointer bg-gray-100 hover:bg-gray-50' onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
          <span className="material-icons">{'<<'}</span>
        </button>
        <button className='border border-gray-300 rounded w-8 cursor-pointer bg-gray-100 hover:bg-gray-50' onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
          <span className="material-icons">{'<'}</span>
        </button>
        <span className="text-sm">Page {currentPage} of {totalPages}</span>
        <button className='border border-gray-300 rounded w-8 cursor-pointer bg-gray-100 hover:bg-gray-50' onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>
          <span className="material-icons">{'>'}</span>
        </button>
        <button className='border border-gray-300 rounded w-8 cursor-pointer bg-gray-100 hover:bg-gray-50' onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
          <span className="material-icons">{'>>'}</span>
        </button>
      </div>
    </div>
  );
};

export default TablePagination;

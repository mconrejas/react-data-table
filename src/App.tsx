import React, { useState } from 'react';
import DataTable from './components/DataTable';
import { ToastContainer } from 'react-toastify';
import { priceRenderer, thumbnailRenderer } from './helpers/renderers';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Data, SortField } from './components/DataTable/types';
import useDataFetcher, { Product } from './hooks/useDataFetcher';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const AppWrapper: React.FC = () => {
  const isServerSide = false;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data, isLoading, isRefetching } = useDataFetcher({
    isServerSide,
    currentPage,
    pageSize,
    sortField,
    searchQuery,
  });

  const columns = [
    { label: '', field: 'thumbnail', renderer: ({ rowData } : { rowData: Data }) => thumbnailRenderer(rowData as Product) },
    { label: 'Title', field: 'title', sortable: true },
    { label: 'Description', field: 'description' },
    { label: 'Price', field: 'price', renderer: ({ cellData } : { cellData: any }) => priceRenderer(cellData), sortable: true, className: "text-center" },
    { label: 'Rating', field: 'rating', sortable: true, className: "text-center" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Custom Data Table</h1>

      <DataTable 
        columns={columns} 
        data={data?.products as Data[] || []} 
        loading={isLoading || isRefetching}
        totalItems={(isServerSide ? data?.total : data?.limit) || 0}

        noDataMessage={<span className='font-bold'>Ops! No data to load.</span>}
        isServerSide={isServerSide}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        onSearch={setSearchQuery}
        onSortChange={setSortField}
      />
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AppWrapper />
  </QueryClientProvider>
);

export default App;

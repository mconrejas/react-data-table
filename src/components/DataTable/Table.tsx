import React from 'react';
import { TableProvider } from './context/TableContext';
import { Table as Props } from './types';
import Spinner from '../LoadingSpinner';
import TableHeader from './TableHeader';
import TablePagination from './TablePagination';
import TableRow from './TableRow';
import TableSearch from './TableSearch';
import './DataTable.scss';

const Table: React.FC<Props> = ({
	data,
	columns,
	pageSizes=[10, 25, 50, 100],
	loading = false, 
	noDataMessage = 'No data to display.',
	totalItems,
	onPageChange,
	onPageSizeChange,
	onSortChange,
	onSearch,
}) => {
	return (
		<div className="w-full mx-auto p-4">
			<TableSearch onSearch={onSearch} />

			<div className="datatable flex flex-col w-full overflow-auto bg-white border border-gray-200 rounded shadow-md">
				<div className="datatable-header flex bg-gray-100 border-b w-max lg:w-full">
					{ columns.length > 0 && <TableHeader onSortChange={onSortChange} /> }
				</div>
				<div className='datatable-body w-max lg:w-full'>
					{ loading && <Spinner /> }
						
					{ !loading && data.length === 0 && <div className="datatable-message p-4 text-center text-gray-600">{noDataMessage}</div> }
					
					{ !loading && data.length > 0 && <TableRow /> }
				</div>
			</div>
			
			<TablePagination
				pageSizes={pageSizes}
				totalItems={totalItems}
				onPageChange={onPageChange}
				onPageSizeChange={onPageSizeChange}
			/>
		</div>
	);
};

const DataTableWrapper: React.FC<Props> = (props) => (
	<TableProvider 
		isServerSide={props.isServerSide}
		data={props.data}
		columns={props.columns}
	>
		<Table {...props} />
	</TableProvider>
);

export default DataTableWrapper;

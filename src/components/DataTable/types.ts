export interface Data {
  [key: string]: any;
};

export interface Column {
  label: string;
  field: string;
  className?: string;
  sortable?: boolean;
  renderer?: ({ cellData, rowData } : { cellData: any, rowData: Data }) => React.ReactNode;
};

export interface SortField extends Pick<Column, 'field'> {
  direction: 'asc' | 'desc';
};

export interface TableContext {
  data: Data[];
  columns: Column[];
  currentPage: number;
  pageSize: number;
  sortField: SortField | null;
  searchQuery: string;
  isServerSide?: boolean;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSortField: (field: SortField | null) => void;
  setSearchQuery: (field: string) => void;
};

export interface Table extends Pick<TableContext, 'data' | 'columns'> {
	loading: boolean;
	totalItems: number;
	pageSizes?: number[];
	isServerSide?: boolean;
  noDataMessage?: string | React.ReactNode | null;
	onPageChange?: (page: number) => void;
	onPageSizeChange?: (pageSize: number) => void;
	onSortChange?: (args: SortField) => void;
	onSearch?: (query: string) => void;
};

export interface TablePagination extends Pick<Table, 'totalItems' | 'pageSizes' | 'onPageChange' | 'onPageSizeChange'> {};

export interface TableSearch extends Pick<Table, 'onSearch'> {};

export interface TableHeader extends Pick<Table, 'onSortChange'> {};
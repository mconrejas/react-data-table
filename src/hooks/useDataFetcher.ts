import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { TableContext } from "../components/DataTable/types";

export interface Product {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	rating: number;
	stock: number;
	brand: string;
	thumbnail: string;
};

interface Response {
	limit: number;
	products: Product[];
	skip: number;
	total: number;
}

const useDataFetcher = ({
	currentPage,
	sortField,
	searchQuery,
	pageSize,
	isServerSide,
} : Pick<TableContext, 'currentPage' | 'sortField' | 'searchQuery' | 'pageSize' | 'isServerSide'>) => {
	const direction = sortField?.direction || 'asc';
	const field = sortField?.field || 'price';

	const serverSide = useQuery<Response, Error>(
		['random-user', searchQuery, currentPage, pageSize, field, direction],
		async (): Promise<Response> => {
			const skip = (currentPage - 1) * pageSize;

			const baseUrl = `https://dummyjson.com/products`;
			const searchUrl = searchQuery
				? `${baseUrl}/search?q=${searchQuery}&limit=${pageSize}&skip=${skip}&sort=${field}&order=${direction}`
				: `${baseUrl}?limit=${pageSize}&skip=${skip}&sort=${field}&order=${direction}`;
					
			const response = await fetch(searchUrl);
			
			if (!response.ok) throw new Error('Failed to fetch data');
			
			return response.json();
		}, 
		{ 
			enabled: isServerSide,
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			onError: (error: Error) => {
					toast.error(`${error}`);
			},
		}
	);

	const nonServerSide = useQuery<Response, Error>(
		['non-server-side'],
		async (): Promise<Response> => {
			const response = await fetch(`https://dummyjson.com/products?limit=100`);
			
			if (!response.ok) throw new Error('Failed to fetch data');
			
			return response.json();
		}, 
		{ 
			enabled: !isServerSide,
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			onError: (error: Error) => {
					toast.error(`${error}`);
			},
		}
	);

	return isServerSide ? serverSide : nonServerSide;
};

export default useDataFetcher;
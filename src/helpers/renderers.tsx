import { Product } from "../hooks/useDataFetcher";
import { formatNumberWithDecimals } from "./numeric";

export const thumbnailRenderer = (rowData: Product) => {
	return (
		<div className="flex flex-row items-center justify-center">
			<img src={rowData.thumbnail} alt={rowData.title} className="w-1/2 h-auto" />
		</div>
	);
};

export const priceRenderer = (cellData: any) => {
	return (
		<span className="text-gray-800 font-semibold">{`$${formatNumberWithDecimals(cellData)}`}</span>
	);
};
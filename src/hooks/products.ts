import { useQuery } from "react-query";
import ProductsService from "../services/products";

export const useGetToolItems = (categoryId: number | undefined) => {
	return useQuery(["getToolItems", categoryId], () =>
		ProductsService.getToolItems(categoryId)
	);
};

export const useGetCuttingItems = (categoryId: number | undefined) => {
	return useQuery(["getCuttingItems", categoryId], () =>
		ProductsService.getCuttingItems(categoryId)
	);
};

export const useGetAdaptiveItems = (categoryId: number | undefined) => {
	return useQuery(["getAdaptiveItems", categoryId], () =>
		ProductsService.getAdaptiveItems(categoryId)
	);
};

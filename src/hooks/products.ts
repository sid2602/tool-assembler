import { useQuery } from "react-query";
import ProductsService from "../services/products";

export const useGetToolItems = (categoryId: number | undefined) => {
	return useQuery(["getToolItems", categoryId], () =>
		ProductsService.getToolItems(categoryId)
	);
};

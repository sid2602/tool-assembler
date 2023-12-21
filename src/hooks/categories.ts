import { useQuery } from "react-query";
import CategoriesService from "../services/categories";

export const useGetToolItemCategories = () => {
	return useQuery(
		["getToolItemCategories"],
		CategoriesService.getToolItemCategories
	);
};

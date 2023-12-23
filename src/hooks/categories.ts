import { useQuery } from "react-query";
import CategoriesService from "../services/categories";

export const useGetToolItemCategories = () => {
	return useQuery(
		["getToolItemCategories"],
		CategoriesService.getToolItemCategories
	);
};

export const useGetAdaptiveItemCategories = () => {
	return useQuery(
		["getAdaptiveItemCategories"],
		CategoriesService.getAdaptiveItemCategories
	);
};

export const useGetCuttingItemCategories = () => {
	return useQuery(
		["getCuttingItemCategories"],
		CategoriesService.getCuttingItemCategories
	);
};

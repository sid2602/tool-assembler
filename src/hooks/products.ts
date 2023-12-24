import { useQuery } from "react-query";
import ProductsService from "../services/products";

export const useGetToolItems = (
	categoryId: number | undefined,
	isEnabled?: boolean
) => {
	return useQuery(
		["getToolItems", categoryId],
		() => ProductsService.getToolItems(categoryId),
		{ enabled: isEnabled }
	);
};

export const useGetCuttingItems = (
	categoryId: number | undefined,
	isEnabled?: boolean
) => {
	return useQuery(
		["getCuttingItems", categoryId],
		() => ProductsService.getCuttingItems(categoryId),
		{ enabled: isEnabled }
	);
};

export const useGetAdaptiveItems = (
	categoryId: number | undefined,
	isEnabled?: boolean
) => {
	return useQuery(
		["getAdaptiveItems", categoryId],
		() => ProductsService.getAdaptiveItems(categoryId),
		{ enabled: isEnabled }
	);
};

export const useGetToolAdaptiveItems = (
	toolItemID: number | undefined,
	isEnabled?: boolean
) => {
	return useQuery(
		["useGetToolAdaptiveItems", toolItemID],
		() => ProductsService.getToolAdaptiveItems(toolItemID),
		{ enabled: isEnabled || toolItemID !== undefined }
	);
};

export const useGetToolCuttingItems = (
	toolItemID: number | undefined,
	cuttingItemID: number | undefined,
	isEnabled?: boolean
) => {
	const toolkey = toolItemID !== undefined ? "tool" + toolItemID : undefined;
	const cuttingKey =
		cuttingItemID !== undefined ? "cutting" + cuttingItemID : undefined;

	return useQuery(
		["useGetToolCuttingItems", toolkey ?? cuttingKey ?? undefined],
		() => ProductsService.getToolCuttingItems(toolItemID, cuttingItemID),
		{ enabled: isEnabled || toolItemID !== undefined }
	);
};

import { useQuery } from "react-query";
import ProductsService from "../services/products";

export const useGetSearchProduct = (
	name: string | string[] | undefined,
	isEnabled?: boolean
) => {
	return useQuery(
		["getSearchProduct", name],
		() => ProductsService.getSearchProduct(name),
		{ enabled: isEnabled }
	);
};

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
	adaptiveItemID: number | undefined,
	isEnabled?: boolean
) => {
	const toolkey = toolItemID !== undefined ? "tool" + toolItemID : undefined;
	const adaptiveKey =
		adaptiveItemID !== undefined ? "adaptive" + adaptiveItemID : undefined;

	return useQuery(
		["useGetToolAdaptiveItems", toolkey ?? adaptiveKey ?? undefined],
		() => ProductsService.getToolAdaptiveItems(toolItemID, adaptiveItemID),
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

export const useGetAdaptiveMatchingItems = (
	machineDirectionAdaptiveItemId: number | undefined,
	workpieceDirectionAdaptiveItemId: number | undefined,
	isEnabled?: boolean
) => {
	const machineKey =
		machineDirectionAdaptiveItemId !== undefined
			? "machine" + machineDirectionAdaptiveItemId
			: undefined;
	const workpieceKey =
		workpieceDirectionAdaptiveItemId !== undefined
			? "workpiece" + workpieceDirectionAdaptiveItemId
			: undefined;

	return useQuery(
		["useGetAdaptiveMatchingItems", machineKey ?? workpieceKey ?? undefined],
		() =>
			ProductsService.getAdaptiveMatchingItems(
				machineDirectionAdaptiveItemId,
				workpieceDirectionAdaptiveItemId
			),
		{ enabled: isEnabled }
	);
};

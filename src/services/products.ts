import { GetAdaptiveItemsSuccessResponse } from "@/pages/api/adaptive-items";
import { GetMatchingAdaptiveSuccessResponse } from "@/pages/api/adaptive-items/matching-adaptive-items";
import { GetCuttingItemsSuccessResponse } from "@/pages/api/cutting-items";
import { GetSearchProductSuccessResponse } from "@/pages/api/search-product";
import { GetToolItemsSuccessResponse } from "@/pages/api/tool-items";
import { GetToolAdaptiveSuccessResponse } from "@/pages/api/tool-items/tool-adaptive";
import { GetToolCuttingSuccessResponse } from "@/pages/api/tool-items/tool-cutting";
import axios from "axios";

class ProductsService {
	async getSearchProduct(
		productName: string | string[] | undefined
	): Promise<GetSearchProductSuccessResponse> {
		if (productName === undefined) {
			throw new Error("No productName specified");
		}

		const resp = await axios.get(
			`http://localhost:3000/api/search-product?name=${productName}`
		);
		return resp.data;
	}

	async getToolItems(
		categoryId: number | undefined
	): Promise<GetToolItemsSuccessResponse> {
		const url =
			categoryId === undefined
				? "http://localhost:3000/api/tool-items"
				: `http://localhost:3000/api/tool-items?category_id=${categoryId}`;

		const resp = await axios.get(url);
		return resp.data;
	}

	async getCuttingItems(
		categoryId: number | undefined
	): Promise<GetCuttingItemsSuccessResponse> {
		const url =
			categoryId === undefined
				? "http://localhost:3000/api/cutting-items"
				: `http://localhost:3000/api/cutting-items?category_id=${categoryId}`;

		const resp = await axios.get(url);
		return resp.data;
	}

	async getAdaptiveItems(
		categoryId: number | undefined
	): Promise<GetAdaptiveItemsSuccessResponse> {
		const url =
			categoryId === undefined
				? "http://localhost:3000/api/adaptive-items"
				: `http://localhost:3000/api/adaptive-items?category_id=${categoryId}`;

		const resp = await axios.get(url);
		return resp.data;
	}

	async getToolAdaptiveItems(
		toolItemId: number | undefined,
		adaptiveItemId: number | undefined
	): Promise<GetToolAdaptiveSuccessResponse> {
		if (toolItemId === undefined && adaptiveItemId === undefined) {
			throw new Error("No toolItemId or adaptiveItemId");
		}

		const url =
			toolItemId === undefined
				? `http://localhost:3000/api/tool-items/tool-adaptive?adaptive_item_id=${adaptiveItemId}`
				: `http://localhost:3000/api/tool-items/tool-adaptive?tool_item_id=${toolItemId}`;

		const resp = await axios.get(url);
		return resp.data;
	}

	async getToolCuttingItems(
		toolItemId: number | undefined,
		cuttingItemId: number | undefined
	): Promise<GetToolCuttingSuccessResponse> {
		if (toolItemId === undefined && cuttingItemId === undefined) {
			throw new Error("No toolItemId or cuttingItemId");
		}

		const url =
			toolItemId === undefined
				? `http://localhost:3000/api/tool-items/tool-cutting?cutting_item_id=${cuttingItemId}`
				: `http://localhost:3000/api/tool-items/tool-cutting?tool_item_id=${toolItemId}`;

		const resp = await axios.get(url);
		return resp.data;
	}

	async getAdaptiveMatchingItems(
		machineDirectionAdaptiveItemId: number | undefined,
		workpieceDirectionAdaptiveItemId: number | undefined
	): Promise<GetMatchingAdaptiveSuccessResponse> {
		if (
			machineDirectionAdaptiveItemId === undefined &&
			workpieceDirectionAdaptiveItemId === undefined
		) {
			throw new Error(
				"No machineDirectionAdaptiveItemId or workpieceDirectionAdaptiveItemId"
			);
		}

		const url =
			machineDirectionAdaptiveItemId !== undefined
				? `http://localhost:3000/api/adaptive-items/matching-adaptive-items?machine_id=${machineDirectionAdaptiveItemId}`
				: `http://localhost:3000/api/adaptive-items/matching-adaptive-items?workpiece_id=${workpieceDirectionAdaptiveItemId}`;

		const resp = await axios.get(url);
		return resp.data;
	}
}

const productsService = new ProductsService();
export default productsService;

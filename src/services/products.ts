import { GetAdaptiveItemsSuccessResponse } from "@/pages/api/adaptive-items";
import { GetCuttingItemsSuccessResponse } from "@/pages/api/cutting-items";
import { GetToolItemsSuccessResponse } from "@/pages/api/tool-items";
import { GetToolAdaptiveSuccessResponse } from "@/pages/api/tool-items/tool-adaptive";
import { GetToolCuttingSuccessResponse } from "@/pages/api/tool-items/tool-cutting";
import axios from "axios";

class ProductsService {
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
		toolItemId: number | undefined
	): Promise<GetToolAdaptiveSuccessResponse> {
		const url =
			toolItemId === undefined
				? "http://localhost:3000/api/tool-items/tool-adaptive"
				: `http://localhost:3000/api/tool-items/tool-adaptive?tool_item_id=${toolItemId}`;

		const resp = await axios.get(url);
		return resp.data;
	}

	async getToolCuttingItems(
		toolItemId: number | undefined
	): Promise<GetToolCuttingSuccessResponse> {
		const url =
			toolItemId === undefined
				? "http://localhost:3000/api/tool-items/tool-cutting"
				: `http://localhost:3000/api/tool-items/tool-cutting?tool_item_id=${toolItemId}`;

		const resp = await axios.get(url);
		return resp.data;
	}
}

const productsService = new ProductsService();
export default productsService;

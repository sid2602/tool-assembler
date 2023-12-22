import { GetAdaptiveItemsSuccessResponse } from "@/pages/api/adaptive-items";
import { GetCuttingItemsSuccessResponse } from "@/pages/api/cutting-items";
import { GetToolItemsSuccessResponse } from "@/pages/api/tool-items";
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
}

const productsService = new ProductsService();
export default productsService;

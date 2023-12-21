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
}

const productsService = new ProductsService();
export default productsService;

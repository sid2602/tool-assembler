import { GetAdaptiveItemCategoriesSuccessResponse } from "@/pages/api/adaptive-categories";
import { GetCuttingItemCategoriesSuccessResponse } from "@/pages/api/cutting-categories";
import { GetToolItemCategoriesSuccessResponse } from "@/pages/api/tool-categories";
import axios from "axios";

class CategoriesService {
	async getToolItemCategories(): Promise<GetToolItemCategoriesSuccessResponse> {
		const resp = await axios.put("http://localhost:3000/api/tool-categories");
		return resp.data;
	}

	async getAdaptiveItemCategories(): Promise<GetAdaptiveItemCategoriesSuccessResponse> {
		const resp = await axios.put(
			"http://localhost:3000/api/adaptive-categories"
		);
		return resp.data;
	}

	async getCuttingItemCategories(): Promise<GetCuttingItemCategoriesSuccessResponse> {
		const resp = await axios.put(
			"http://localhost:3000/api/cutting-categories"
		);
		return resp.data;
	}
}

const categoriesService = new CategoriesService();
export default categoriesService;

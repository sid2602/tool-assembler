import { GetToolItemCategoriesSuccessResponse } from "@/pages/api/tool-categories";
import axios from "axios";

class CategoriesService {
	async getToolItemCategories(): Promise<GetToolItemCategoriesSuccessResponse> {
		const resp = await axios.put("http://localhost:3000/api/tool-categories");
		return resp.data;
	}
}

const categoriesService = new CategoriesService();
export default categoriesService;

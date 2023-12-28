import { PostToolAssemblySuccessResponse } from "@/pages/api/tool-assembly";
import {
	GetToolAssemblySuccessResponse,
	PutToolAssemblyBody,
} from "@/pages/api/tool-assembly/[id]";
import {
	DeleteToolAssemblyAdaptiveItemSuccessResponse,
	PostToolAssemblyAdaptiveItemBody,
	PostToolAssemblyAdaptiveItemSuccessResponse,
} from "@/pages/api/tool-assembly/adaptive-item";
import {
	PostToolAssemblyCuttingItemBody,
	PostToolAssemblyCuttingItemResponse,
} from "@/pages/api/tool-assembly/cutting-item";
import {
	DeleteToolAssemblyToolItemSuccessResponse,
	PostToolAssemblyToolItemBody,
	PostToolAssemblyToolItemSuccessResponse,
} from "@/pages/api/tool-assembly/tool-item";
import axios from "axios";

class ToolAssemblyService {
	async createToolAssembly(): Promise<PostToolAssemblySuccessResponse> {
		const resp = await axios.post("http://localhost:3000/api/tool-assembly");
		return resp.data;
	}

	async updateToolAssembly(
		id: number | undefined,
		data: PutToolAssemblyBody
	): Promise<PostToolAssemblySuccessResponse> {
		const resp = await axios.put(
			"http://localhost:3000/api/tool-assembly/" + id,
			{ data }
		);
		return resp.data;
	}

	async getToolAssembly(
		id: number | undefined
	): Promise<GetToolAssemblySuccessResponse> {
		const resp = await axios.get(
			"http://localhost:3000/api/tool-assembly/" + id
		);
		return resp.data;
	}

	async addAdaptiveItem(
		data: PostToolAssemblyAdaptiveItemBody
	): Promise<PostToolAssemblyAdaptiveItemSuccessResponse> {
		const resp = await axios.post(
			"http://localhost:3000/api/tool-assembly/adaptive-item",
			{ data }
		);
		return resp.data;
	}

	async addCuttingItem(
		data: PostToolAssemblyCuttingItemBody
	): Promise<PostToolAssemblyCuttingItemResponse> {
		const resp = await axios.post(
			"http://localhost:3000/api/tool-assembly/cutting-item",
			{ data }
		);
		return resp.data;
	}

	async addToolItem(
		data: PostToolAssemblyToolItemBody
	): Promise<PostToolAssemblyToolItemSuccessResponse> {
		const resp = await axios.post(
			"http://localhost:3000/api/tool-assembly/tool-item",
			{ data }
		);
		return resp.data;
	}

	async deleteAdaptiveItem(
		id: number | undefined
	): Promise<DeleteToolAssemblyAdaptiveItemSuccessResponse> {
		const resp = await axios.delete(
			"http://localhost:3000/api/tool-assembly/adaptive-item?id=" + id
		);
		return resp.data;
	}

	async deleteToolItem(
		id: number | undefined
	): Promise<DeleteToolAssemblyToolItemSuccessResponse> {
		const resp = await axios.delete(
			"http://localhost:3000/api/tool-assembly/tool-item?id=" + id
		);
		return resp.data;
	}

	async deleteCuttingItem(
		id: number | undefined
	): Promise<DeleteToolAssemblyToolItemSuccessResponse> {
		const resp = await axios.delete(
			"http://localhost:3000/api/tool-assembly/cutting-item?id=" + id
		);
		return resp.data;
	}
}

const toolAssemblyService = new ToolAssemblyService();
export default toolAssemblyService;

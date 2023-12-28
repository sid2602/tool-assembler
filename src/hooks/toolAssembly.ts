import { PutToolAssemblyBody } from "@/pages/api/tool-assembly/[id]";
import { PostToolAssemblyAdaptiveItemBody } from "@/pages/api/tool-assembly/adaptive-item";
import { PostToolAssemblyCuttingItemBody } from "@/pages/api/tool-assembly/cutting-item";
import { PostToolAssemblyToolItemBody } from "@/pages/api/tool-assembly/tool-item";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ToolAssemblyService from "../services/toolAssembly";

export const useCreateToolAssembly = () => {
	const queryClient = useQueryClient();
	return useMutation(
		() => {
			return ToolAssemblyService.createToolAssembly();
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("getToolAssembly");
			},
		}
	);
};

interface UseUpdateToolAssemblyParams {
	id: number | undefined;
	data: PutToolAssemblyBody;
}

export const useUpdateToolAssembly = () => {
	const queryClient = useQueryClient();
	return useMutation(
		(params: UseUpdateToolAssemblyParams) => {
			return ToolAssemblyService.updateToolAssembly(params.id, params.data);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("getToolAssembly");
			},
		}
	);
};

export const useAddAdaptiveItem = () => {
	const queryClient = useQueryClient();
	return useMutation(
		(data: PostToolAssemblyAdaptiveItemBody) => {
			return ToolAssemblyService.addAdaptiveItem(data);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("getToolAssembly");
			},
		}
	);
};

export const useAddCuttingItem = () => {
	const queryClient = useQueryClient();
	return useMutation(
		(data: PostToolAssemblyCuttingItemBody) => {
			return ToolAssemblyService.addCuttingItem(data);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("getToolAssembly");
			},
		}
	);
};

export const useAddToolItem = () => {
	const queryClient = useQueryClient();
	return useMutation(
		(data: PostToolAssemblyToolItemBody) => {
			return ToolAssemblyService.addToolItem(data);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("getToolAssembly");
			},
		}
	);
};

export const useGetToolAssembly = (id: number | undefined) => {
	return useQuery(
		["getToolAssembly", id],
		() => ToolAssemblyService.getToolAssembly(id),
		{ enabled: id !== undefined }
	);
};

export const useDeleteAdaptiveItem = (id: number | undefined) => {
	const queryClient = useQueryClient();

	return useMutation(
		["useDeleteAdaptiveItem"],
		() => ToolAssemblyService.deleteAdaptiveItem(id),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("getToolAssembly");
			},
		}
	);
};

export const useDeleteToolItem = (id: number | undefined) => {
	const queryClient = useQueryClient();

	return useMutation(
		["useDeleteToolItem"],
		() => ToolAssemblyService.deleteToolItem(id),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("getToolAssembly");
			},
		}
	);
};

export const useDeleteCuttinglItem = (id: number | undefined) => {
	const queryClient = useQueryClient();

	return useMutation(
		["useDeleteCuttinglItem"],
		() => ToolAssemblyService.deleteCuttingItem(id),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("getToolAssembly");
			},
		}
	);
};

import { Tool_assembly } from "@/pages/api/tool-assembly/[id]";

export const checkToolAssemblyHaveItem = (
	toolAssembly: Tool_assembly | undefined
): boolean => {
	if (toolAssembly === undefined) return false;
	const arrays = [
		toolAssembly.used_adaptive_item,
		toolAssembly.used_assembly_item,
		toolAssembly.used_cutting_item,
		toolAssembly.used_tool_item,
	];

	return arrays.some((array) => array.length > 0);
};

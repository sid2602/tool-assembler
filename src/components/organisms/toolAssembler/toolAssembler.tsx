import AddToolAssemblerItem from "@/components/molecues/toolAssemblerItem/addtoolAssemblerItem";
import ToolAssemblerItem from "@/components/molecues/toolAssemblerItem/toolAssemblerItem";
import { useToolAssemblyContext } from "@/contexts/toolAssembly.context";
import {
	useGetToolAdaptiveItems,
	useGetToolCuttingItems,
} from "@/hooks/products";

interface Props {}

export default function ToolAssembler({}: Props) {
	const { toolAssembly, onOpen } = useToolAssemblyContext();
	const toolCutting = useGetToolCuttingItems(
		toolAssembly?.used_tool_item?.[0]?.tool_item_id ?? undefined
	);
	const toolAdaptive = useGetToolAdaptiveItems(
		toolAssembly?.used_tool_item?.[0]?.tool_item_id ?? undefined
	);

	if (toolAssembly === undefined) {
		return <AddToolAssemblerItem handleButton={() => onOpen()} />;
	}

	const { used_tool_item } = toolAssembly;

	if (used_tool_item.length > 0) {
		return (
			<>
				{toolAdaptive.data?.items?.length === 0 ? null : (
					<AddToolAssemblerItem
						handleButton={() =>
							onOpen(
								"lists",
								"tool-adaptive",
								toolAdaptive.data?.items?.[0].tool_item_id ?? undefined
							)
						}
					/>
				)}
				{used_tool_item.map((item) => (
					<ToolAssemblerItem key={item.id} item={item.tool_item} />
				))}
				{toolCutting.data?.items?.length === 0 ? null : (
					<AddToolAssemblerItem
						handleButton={() =>
							onOpen(
								"lists",
								"tool-cutting",
								toolCutting.data?.items?.[0].tool_item_id ?? undefined
							)
						}
					/>
				)}
			</>
		);
	}

	return null;
}

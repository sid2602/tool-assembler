import AddToolAssemblerItem from "@/components/molecues/toolAssemblerItem/addtoolAssemblerItem";
import ToolAssemblerItem from "@/components/molecues/toolAssemblerItem/toolAssemblerItem";
import {
	OnOpenFunctionType,
	useToolAssemblyContext,
} from "@/contexts/toolAssembly.context";
import {
	useGetToolAdaptiveItems,
	useGetToolCuttingItems,
} from "@/hooks/products";
import { Tool_assembly } from "@/pages/api/tool-assembly/[id]";

interface Props {}

const isToolAssemblerEmpty = (
	toolAssembly: Tool_assembly | undefined
): boolean => {
	if (toolAssembly === undefined) {
		return true;
	}

	if (
		toolAssembly.used_adaptive_item.length === 0 &&
		toolAssembly.used_assembly_item.length === 0 &&
		toolAssembly.used_cutting_item.length === 0 &&
		toolAssembly.used_tool_item.length === 0
	) {
		return true;
	}

	return false;
};
interface MapedItem {
	id: number;
	type: "tool" | "cutting" | "adaptive";
	name: string;
	img: string | null;
	order: number;
	row: number;
}

const mapToolAssembly = (
	toolAssembly: Tool_assembly | undefined
): MapedItem[] => {
	const tool_items: MapedItem[] =
		toolAssembly?.used_tool_item.map((item) => ({
			id: item.tool_item_id,
			type: "tool",
			name: item.tool_item.name,
			img: item.tool_item.img,
			order: item.order,
			row: item.row,
		})) ?? [];
	44;
	const adaptive_items: MapedItem[] =
		toolAssembly?.used_adaptive_item.map((item) => ({
			id: item.adaptive_item_id,
			type: "adaptive",
			name: item.adaptive_item.name,
			img: item.adaptive_item.img,
			order: item.order,
			row: item.row,
		})) ?? [];

	const cutting_items: MapedItem[] =
		toolAssembly?.used_cutting_item.map((item) => ({
			id: item.cutting_item_id,
			type: "cutting",
			name: item.cutting_item.name,
			img: item.cutting_item.img,
			order: item.order,
			row: item.row,
		})) ?? [];

	const finalArray = [...adaptive_items, ...tool_items, ...cutting_items].sort(
		(a, b) => {
			return a.order - b.order;
		}
	);

	return finalArray;
};

interface MachineDirectionProps {
	item: MapedItem;
	haveChild: boolean;
	onOpen: OnOpenFunctionType;
}

const MachineDirection = ({
	item,
	haveChild,
	onOpen,
}: MachineDirectionProps) => {
	const toolAdaptive = useGetToolAdaptiveItems(
		item.id ?? undefined,
		undefined,
		item.type === "tool"
	);

	const toolCutting = useGetToolCuttingItems(
		undefined,
		item.id ?? undefined,
		item.type === "cutting"
	);

	if (
		item.type === "tool" &&
		toolAdaptive.data?.items.length !== 0 &&
		haveChild === false
	) {
		return (
			<AddToolAssemblerItem
				handleButton={() =>
					onOpen("lists", "tool-adaptive", item.id, item.order - 1)
				}
			/>
		);
	}

	if (
		item.type === "cutting" &&
		toolCutting.data?.items.length !== 0 &&
		haveChild === false
	) {
		return (
			<AddToolAssemblerItem
				handleButton={() =>
					onOpen("lists", "cutting-tool", item.id, item.order - 1)
				}
			/>
		);
	}

	return null;
};

interface WorkpieceDirectionProps {
	item: MapedItem;
	haveParent: boolean;
	onOpen: OnOpenFunctionType;
}

const WorkpieceDirection = ({
	item,
	haveParent,
	onOpen,
}: WorkpieceDirectionProps) => {
	const toolAdaptive = useGetToolAdaptiveItems(
		undefined,
		item.id ?? undefined,
		item.type === "adaptive"
	);

	const toolCutting = useGetToolCuttingItems(
		item.id ?? undefined,
		undefined,
		item.type === "tool"
	);

	if (
		item.type === "adaptive" &&
		toolAdaptive.data?.items.length !== 0 &&
		haveParent === false
	) {
		return (
			<AddToolAssemblerItem
				handleButton={() =>
					onOpen("lists", "adaptive-tool", item.id, item.order + 1)
				}
			/>
		);
	}

	if (
		item.type === "tool" &&
		toolCutting.data?.items.length !== 0 &&
		haveParent === false
	) {
		return (
			<AddToolAssemblerItem
				handleButton={() =>
					onOpen("lists", "tool-cutting", item.id, item.order + 1)
				}
			/>
		);
	}

	return null;
};

export default function ToolAssembler({}: Props) {
	const { toolAssembly, onOpen } = useToolAssemblyContext();

	const mapedToolAseemblyItems: MapedItem[] = mapToolAssembly(toolAssembly);

	if (isToolAssemblerEmpty(toolAssembly) === true) {
		return <AddToolAssemblerItem handleButton={() => onOpen()} />;
	}

	console.log(mapedToolAseemblyItems);

	return (
		<>
			{mapedToolAseemblyItems.map((item) => (
				<>
					<MachineDirection
						key={item.name + item.row + item.order + "Machine Direction"}
						item={item}
						haveChild={
							mapedToolAseemblyItems.find(
								(mapedItem) =>
									mapedItem.order === item.order - 1 &&
									mapedItem.row === item.row
							)
								? true
								: false
						}
						onOpen={onOpen}
					/>
					<ToolAssemblerItem
						key={item.name + item.row + item.order}
						item={{ name: item.name, img: item.img }}
					/>
					<WorkpieceDirection
						key={item.name + item.row + item.order + "Workpiece Direction"}
						item={item}
						haveParent={
							mapedToolAseemblyItems.find(
								(mapedItem) =>
									mapedItem.order === item.order + 1 &&
									mapedItem.row === item.row
							)
								? true
								: false
						}
						onOpen={onOpen}
					/>
				</>
			))}
		</>
	);
}

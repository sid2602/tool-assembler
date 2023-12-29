import AddToolAssemblerItem from "@/components/molecues/toolAssemblerItem/addtoolAssemblerItem";
import ToolAssemblerItem from "@/components/molecues/toolAssemblerItem/toolAssemblerItem";
import {
	OnOpenFunctionType,
	useToolAssemblyContext,
} from "@/contexts/toolAssembly.context";
import {
	useGetAdaptiveMatchingItems,
	useGetToolAdaptiveItems,
	useGetToolCuttingItems,
} from "@/hooks/products";
import { useGetToolAssembly } from "@/hooks/toolAssembly";
import { Tool_assembly } from "@/pages/api/tool-assembly/[id]";
import { checkSomeQueryParam } from "@/utils/client/checkSomeQueryParam";
import { Spinner } from "@chakra-ui/react";

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
	usedItemId: number;
	numberOfPossibleWorkpieceItems?: number;
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
			usedItemId: item.id,
			numberOfPossibleWorkpieceItems: 1,
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
			usedItemId: item.id,
			numberOfPossibleWorkpieceItems:
				item.adaptive_item.number_of_possible_tool_items,
			name: item.adaptive_item.name,
			img: item.adaptive_item.img,
			order: item.order,
			row: item.row,
		})) ?? [];

	const cutting_items: MapedItem[] =
		toolAssembly?.used_cutting_item.map((item) => ({
			id: item.cutting_item_id,
			type: "cutting",
			usedItemId: item.id,
			numberOfPossibleWorkpieceItems: 1,
			data: item.cutting_item,
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

	const machineDirectionAdaptiveItems = useGetAdaptiveMatchingItems(
		undefined,
		item.id,
		item.type === "adaptive"
	);

	const isLoading = checkSomeQueryParam(
		true,
		"isLoading",
		toolAdaptive,
		toolCutting,
		machineDirectionAdaptiveItems
	);

	if (isLoading) {
		return null;
	}

	if (
		item.type === "adaptive" &&
		machineDirectionAdaptiveItems.data?.items.length !== 0 &&
		haveChild === false
	) {
		return (
			<AddToolAssemblerItem
				handleButton={() =>
					onOpen("lists", "adaptive-machine", item.id, item.order - 1)
				}
			/>
		);
	}

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

	const workpieceDirectionAdaptiveItems = useGetAdaptiveMatchingItems(
		item.id,
		undefined,
		item.type === "adaptive"
	);

	const isLoading = checkSomeQueryParam(
		true,
		"isLoading",
		toolAdaptive,
		toolCutting,
		workpieceDirectionAdaptiveItems
	);

	if (isLoading) {
		return null;
	}

	if (
		item.type === "adaptive" &&
		toolAdaptive.data?.items.length !== 0 &&
		haveParent === false &&
		item?.numberOfPossibleWorkpieceItems !== undefined &&
		item?.numberOfPossibleWorkpieceItems > 0
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
		item.type === "adaptive" &&
		workpieceDirectionAdaptiveItems.data?.items.length !== 0 &&
		haveParent === false &&
		(item?.numberOfPossibleWorkpieceItems === undefined ||
			item?.numberOfPossibleWorkpieceItems === 0)
	) {
		return (
			<AddToolAssemblerItem
				handleButton={() =>
					onOpen("lists", "adaptive-workpiece", item.id, item.order + 1)
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
	const { toolAssemblyId, onOpen } = useToolAssemblyContext();

	const { data: toolAssemblyData, isLoading } =
		useGetToolAssembly(toolAssemblyId);
	const tollAssembly = toolAssemblyData?.item ?? undefined;
	const mapedToolAseemblyItems: MapedItem[] = mapToolAssembly(tollAssembly);

	if (isToolAssemblerEmpty(tollAssembly) === true) {
		return <AddToolAssemblerItem handleButton={() => onOpen()} />;
	}

	const canBeDeleted = (order: number) => {
		const minOrder = Math.min(
			...mapedToolAseemblyItems.map((item) => item.order)
		);
		const maxOrder = Math.max(
			...mapedToolAseemblyItems.map((item) => item.order)
		);

		return order === minOrder || order === maxOrder;
	};

	if (isLoading) {
		return (
			<Spinner
				thickness="4px"
				speed="0.65s"
				emptyColor="gray.200"
				color="blue.500"
				size="xl"
			/>
		);
	}

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
						usedItemId={item.usedItemId}
						type={item.type}
						canBeDeleted={canBeDeleted(item.order)}
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

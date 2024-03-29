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
import { Box, Flex, Spinner } from "@chakra-ui/react";

interface Props {}

const isToolAssemblerEmpty = (
	toolAssembly: Tool_assembly | undefined
): boolean => {
	if (toolAssembly === undefined) {
		return true;
	}

	if (
		toolAssembly.used_adaptive_item.length === 0 &&
		toolAssembly.used_cutting_item.length === 0 &&
		toolAssembly.used_tool_item.length === 0
	) {
		return true;
	}

	return false;
};

const checkIfProductHaveChild = (
	order: number,
	column: number,
	array: MapedItem[]
): boolean => {
	return array.some((item) => item.order === order && item.column === column);
};

interface MapedItem {
	id: number;
	type: "tool" | "cutting" | "adaptive";
	usedItemId: number;
	numberOfPossibleWorkpieceItems?: number;
	canHaveToolItem?: boolean;
	name: string;
	img: string | null;
	order: number;
	column: number;
}

const mapToolAssembly = (
	toolAssembly: Tool_assembly | undefined
): MapedItem[] => {
	const tool_items: MapedItem[] =
		toolAssembly?.used_tool_item.map((item) => ({
			id: item.tool_item_id,
			type: "tool",
			usedItemId: item.id,
			numberOfPossibleWorkpieceItems:
				item.tool_item.number_of_possible_connections,
			canHaveToolItem: false,
			name: item.tool_item.name,
			img: item.tool_item.img,
			order: item.order,
			column: item.column,
		})) ?? [];
	44;
	const adaptive_items: MapedItem[] =
		toolAssembly?.used_adaptive_item.map((item) => ({
			id: item.adaptive_item_id,
			type: "adaptive",
			usedItemId: item.id,
			numberOfPossibleWorkpieceItems:
				item.adaptive_item.number_of_possible_connections,
			canHaveToolItem: item.adaptive_item.can_have_tool_item,
			name: item.adaptive_item.name,
			img: item.adaptive_item.img,
			order: item.order,
			column: item.column,
		})) ?? [];

	const cutting_items: MapedItem[] =
		toolAssembly?.used_cutting_item.map((item) => ({
			id: item.cutting_item_id,
			type: "cutting",
			usedItemId: item.id,
			numberOfPossibleWorkpieceItems: 1,
			canHaveToolItem: false,
			data: item.cutting_item,
			name: item.cutting_item.name,
			img: item.cutting_item.img,
			order: item.order,
			column: item.column,
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
	array: MapedItem[];
	onOpen: OnOpenFunctionType;
}

const MachineDirection = ({ item, array, onOpen }: MachineDirectionProps) => {
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

	const canAddSingleElement = checkIfProductHaveChild(
		item.order - 1,
		item.column,
		array
	);

	const haveParentWithHigerColumn = checkIfProductHaveChild(
		item.order - 1,
		item.column + 1,
		array
	);

	const haveParentWithLowerColumn = checkIfProductHaveChild(
		item.order - 1,
		item.column - 1,
		array
	);

	if (isLoading) {
		return null;
	}

	if (
		item.type === "adaptive" &&
		machineDirectionAdaptiveItems.data?.items.length !== 0 &&
		canAddSingleElement === false &&
		haveParentWithHigerColumn === false &&
		haveParentWithLowerColumn === false
	) {
		return (
			<AddToolAssemblerItem
				handleButton={() =>
					onOpen(
						"lists",
						"adaptive-machine",
						item.id,
						item.order - 1,
						item.column
					)
				}
				direction="left"
			/>
		);
	}

	if (
		item.type === "tool" &&
		toolAdaptive.data?.items.length !== 0 &&
		canAddSingleElement === false
	) {
		return (
			<AddToolAssemblerItem
				handleButton={() =>
					onOpen("lists", "tool-adaptive", item.id, item.order - 1, item.column)
				}
				direction="left"
			/>
		);
	}

	if (
		item.type === "cutting" &&
		toolCutting.data?.items.length !== 0 &&
		canAddSingleElement === false &&
		haveParentWithLowerColumn === false &&
		haveParentWithHigerColumn === false
	) {
		return (
			<AddToolAssemblerItem
				handleButton={() =>
					onOpen("lists", "cutting-tool", item.id, item.order - 1, item.column)
				}
				direction="left"
			/>
		);
	}

	return null;
};

interface WorkpieceDirectionProps {
	item: MapedItem;
	array: MapedItem[];
	onOpen: OnOpenFunctionType;
}

const WorkpieceDirection = ({
	item,
	array,
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

	const canAddSingleElement = checkIfProductHaveChild(
		item.order + 1,
		item.column,
		array
	);

	if (
		item.type === "adaptive" &&
		toolAdaptive.data?.items.length !== 0 &&
		canAddSingleElement === false &&
		item?.numberOfPossibleWorkpieceItems !== undefined &&
		item?.numberOfPossibleWorkpieceItems > 0
	) {
		return (
			<AddToolAssemblerItem
				handleButton={() =>
					onOpen("lists", "adaptive-tool", item.id, item.order + 1, item.column)
				}
				direction="right"
			/>
		);
	}
	if (
		item.type === "adaptive" &&
		workpieceDirectionAdaptiveItems.data?.items.length !== 0 &&
		item?.numberOfPossibleWorkpieceItems !== undefined &&
		item?.numberOfPossibleWorkpieceItems !== 0
	) {
		if (item.numberOfPossibleWorkpieceItems > 1) {
			return (
				<Box>
					{checkIfProductHaveChild(item.order + 1, item.column - 1, array) ? (
						<Box w="175px" h="175px" position="absolute">
							<Box
								position="absolute"
								w="70%"
								h="70%"
								left="-15%"
								top="-70%"
								transform="translate(-50%,-50%)"
								border="solid 5px #000"
								borderColor="#000 transparent transparent #000"
								borderRadius="50%/2000px"
								zIndex={-1}
							></Box>
						</Box>
					) : (
						<AddToolAssemblerItem
							handleButton={() =>
								onOpen(
									"lists",
									"adaptive-workpiece",
									item.id,
									item.order + 1,
									item.column - 1
								)
							}
							direction="right-top"
						/>
					)}

					{checkIfProductHaveChild(item.order + 1, item.column + 1, array) ? (
						<Box w="175px" h="175px" position="absolute">
							<Box
								position="absolute"
								w="70%"
								h="70%"
								left="-15%"
								top="70%"
								transform="translate(-50%,-50%)"
								border="solid 5px #000"
								borderColor="transparent transparent #000 #000"
								borderRadius="50%/2000px"
								zIndex={-1}
							></Box>
						</Box>
					) : (
						<AddToolAssemblerItem
							handleButton={() =>
								onOpen(
									"lists",
									"adaptive-workpiece",
									item.id,
									item.order + 1,
									item.column + 1
								)
							}
							direction="right-bottom"
						/>
					)}
				</Box>
			);
		}

		if (canAddSingleElement === false) {
			return (
				<AddToolAssemblerItem
					handleButton={() =>
						onOpen(
							"lists",
							"adaptive-workpiece",
							item.id,
							item.order + 1,
							item.column
						)
					}
					direction="right"
				/>
			);
		}
	}

	if (
		item.type === "tool" &&
		toolCutting.data?.items.length !== 0 &&
		(item?.numberOfPossibleWorkpieceItems ?? 1) > 1
	) {
		return (
			<Box>
				{checkIfProductHaveChild(item.order + 1, item.column, array) &&
				(item?.numberOfPossibleWorkpieceItems ?? 1) >= 3 ? (
					<Box
						width="100px"
						height="2px"
						border="3px solid black"
						position="absolute"
						left="100%"
						top="50%"
					></Box>
				) : (
					<AddToolAssemblerItem
						handleButton={() =>
							onOpen(
								"lists",
								"tool-cutting",
								item.id,
								item.order + 1,
								item.column
							)
						}
						direction="right"
					/>
				)}

				{checkIfProductHaveChild(item.order + 1, item.column - 1, array) ? (
					<Box w="175px" h="175px" position="absolute">
						<Box
							position="absolute"
							w="70%"
							h="70%"
							left="-15%"
							top="-70%"
							transform="translate(-50%,-50%)"
							border="solid 5px #000"
							borderColor="#000 transparent transparent #000"
							borderRadius="50%/2000px"
							zIndex={-1}
						></Box>
					</Box>
				) : (
					<AddToolAssemblerItem
						handleButton={() =>
							onOpen(
								"lists",
								"tool-cutting",
								item.id,
								item.order + 1,
								item.column - 1
							)
						}
						direction="right-top"
					/>
				)}

				{checkIfProductHaveChild(item.order + 1, item.column + 1, array) ? (
					<Box w="175px" h="175px" position="absolute">
						<Box
							position="absolute"
							w="70%"
							h="70%"
							left="-15%"
							top="70%"
							transform="translate(-50%,-50%)"
							border="solid 5px #000"
							borderColor="transparent transparent #000 #000"
							borderRadius="50%/2000px"
							zIndex={-1}
						></Box>
					</Box>
				) : (
					<AddToolAssemblerItem
						handleButton={() =>
							onOpen(
								"lists",
								"tool-cutting",
								item.id,
								item.order + 1,
								item.column + 1
							)
						}
						direction="right-bottom"
					/>
				)}
			</Box>
		);
	}

	if (
		item.type === "tool" &&
		toolCutting.data?.items.length !== 0 &&
		canAddSingleElement === false
	) {
		return (
			<AddToolAssemblerItem
				handleButton={() =>
					onOpen("lists", "tool-cutting", item.id, item.order + 1, item.column)
				}
				direction="right"
			/>
		);
	}

	if (canAddSingleElement === true) {
		return (
			<Box
				width="100px"
				height="2px"
				border="3px solid black"
				position="absolute"
				left="100%"
				top="50%"
			></Box>
		);
	}

	return null;
};

function createArrayFromNToM(n: number, m: number) {
	return Array.from({ length: m - n + 1 }, (_, index) => index + n);
}

export default function ToolAssembler({}: Props) {
	const { toolAssemblyId, onOpen } = useToolAssemblyContext();
	const { data: toolAssemblyData, isLoading } =
		useGetToolAssembly(toolAssemblyId);
	const tollAssembly = toolAssemblyData?.item ?? undefined;
	const mapedToolAseemblyItems: MapedItem[] = mapToolAssembly(tollAssembly);

	if (isToolAssemblerEmpty(tollAssembly) === true) {
		return (
			<AddToolAssemblerItem handleButton={() => onOpen()} direction="center" />
		);
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

	const minOrder = Math.min(
		...mapedToolAseemblyItems.map((item) => item.order)
	);

	const maxOrder = Math.max(
		...mapedToolAseemblyItems.map((item) => item.order)
	);

	const minColumn = Math.min(
		...mapedToolAseemblyItems.map((item) => item.column)
	);

	const maxColumn = Math.max(
		...mapedToolAseemblyItems.map((item) => item.column)
	);

	const orderArray = createArrayFromNToM(minOrder, maxOrder);
	const columnArray = createArrayFromNToM(minColumn, maxColumn);

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
		<Flex
			position="relative"
			w="100%"
			h="50%"
			justifyContent="center"
			alignItems="center"
		>
			{orderArray.map((order) => (
				<Flex key={order + "order"} flexDir="column">
					{columnArray.map((column) => {
						const item = mapedToolAseemblyItems.find(
							(toolAssemblyItem) =>
								toolAssemblyItem.column === column &&
								toolAssemblyItem.order === order
						);

						if (item === undefined) {
							return (
								<Box
									w="175px"
									h="175px"
									key={column + "column"}
									position="relative"
								></Box>
							);
						}

						return (
							<Flex
								m="2"
								key={order + column}
								alignItems="center"
								zIndex="1"
								position="relative"
							>
								<MachineDirection
									item={item}
									array={mapedToolAseemblyItems}
									onOpen={onOpen}
								/>
								<ToolAssemblerItem
									item={{ name: item.name, img: item.img }}
									usedItemId={item.usedItemId}
									type={item.type}
									canBeDeleted={canBeDeleted(item.order)}
								/>
								<WorkpieceDirection
									item={item}
									array={mapedToolAseemblyItems}
									onOpen={onOpen}
								/>
							</Flex>
						);
					})}
				</Flex>
			))}
		</Flex>
	);
}

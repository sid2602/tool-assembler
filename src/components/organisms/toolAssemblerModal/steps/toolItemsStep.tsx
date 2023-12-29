import {
	useGetToolAdaptiveItems,
	useGetToolCuttingItems,
	useGetToolItems,
} from "@/hooks/products";
import {
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@chakra-ui/react";

import ToolAssemblerItemsTable from "@/components/molecues/toolAssemblerItemsTable/toolAssemblerItemsTable";
import {
	ListCategoryName,
	useToolAssemblyContext,
} from "@/contexts/toolAssembly.context";
import { GetToolItemsSuccessResponse } from "@/pages/api/tool-items";
import { GetToolAdaptiveSuccessResponse } from "@/pages/api/tool-items/tool-adaptive";
import { GetToolCuttingSuccessResponse } from "@/pages/api/tool-items/tool-cutting";
import { Tool_item } from "@prisma/client";
import { UseQueryResult } from "react-query";
interface Props {
	listCategory: ListCategoryName;
	categoryId: number | null | undefined;
	searchId: number | null | undefined;
}

const filterData = (
	toolItems: UseQueryResult<GetToolItemsSuccessResponse, unknown>,
	cuttingTool: UseQueryResult<GetToolCuttingSuccessResponse, unknown>,
	adaptiveTool: UseQueryResult<GetToolAdaptiveSuccessResponse, unknown>,
	listCategory: ListCategoryName
): {
	data: Tool_item[];
	isLoading: boolean;
	isError: boolean;
} => {
	if (listCategory === "tool-item-categories") {
		return {
			data: toolItems.data?.items ?? [],
			isLoading: toolItems.isLoading,
			isError: toolItems.isError,
		};
	}

	if (listCategory === "cutting-tool") {
		return {
			data: cuttingTool.data?.items.map((item) => item.tool_item) ?? [],
			isLoading: cuttingTool.isLoading,
			isError: cuttingTool.isError,
		};
	}

	if (listCategory === "adaptive-tool") {
		return {
			data: adaptiveTool.data?.items.map((item) => item.tool_item) ?? [],
			isLoading: adaptiveTool.isLoading,
			isError: adaptiveTool.isError,
		};
	}

	return {
		data: [],
		isLoading: false,
		isError: false,
	};
};

export default function ToolItemsStep({
	categoryId,
	listCategory,
	searchId,
}: Props) {
	const { addToolItem } = useToolAssemblyContext();

	const toolItems = useGetToolItems(
		categoryId ?? undefined,
		listCategory === "tool-item-categories"
	);

	const cuttingTool = useGetToolCuttingItems(
		undefined,
		searchId ?? undefined,
		listCategory === "cutting-tool"
	);

	const adaptiveTool = useGetToolAdaptiveItems(
		undefined,
		searchId ?? undefined,
		listCategory === "adaptive-tool"
	);

	const { data, isLoading, isError } = filterData(
		toolItems,
		cuttingTool,
		adaptiveTool,
		listCategory
	);

	if (isError) {
		return;
	}

	return (
		<ModalContent maxW="1000px" maxH="700px" h="100%">
			<ModalHeader>Choose your first product</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<ToolAssemblerItemsTable
					isLoading={isLoading}
					tableData={{
						type: "Tool",
						data: data ?? [],
						keys: ["name", "LU", "PL", "WT"],
					}}
					onClick={addToolItem}
				/>
			</ModalBody>

			<ModalFooter></ModalFooter>
		</ModalContent>
	);
}

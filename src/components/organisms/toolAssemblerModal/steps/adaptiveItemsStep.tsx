import ToolAssemblerItemsTable from "@/components/molecues/toolAssemblerItemsTable/toolAssemblerItemsTable";
import {
	ListCategoryName,
	useToolAssemblyContext,
} from "@/contexts/toolAssembly.context";
import {
	useGetAdaptiveItems,
	useGetAdaptiveMatchingItems,
	useGetToolAdaptiveItems,
} from "@/hooks/products";
import { GetAdaptiveItemsSuccessResponse } from "@/pages/api/adaptive-items";
import { GetMatchingAdaptiveSuccessResponse } from "@/pages/api/adaptive-items/matching-adaptive-items";
import { GetToolAdaptiveSuccessResponse } from "@/pages/api/tool-items/tool-adaptive";
import {
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
} from "@chakra-ui/react";

import { Adaptive_item } from "@prisma/client";
import { UseQueryResult } from "react-query";

interface Props {
	listCategory: ListCategoryName;
	categoryId: number | null | undefined;
	searchId: number | null | undefined;
}

const filterData = (
	adaptiveItems: UseQueryResult<GetAdaptiveItemsSuccessResponse, unknown>,
	toolAdaptive: UseQueryResult<GetToolAdaptiveSuccessResponse, unknown>,
	matchingAdaptive: UseQueryResult<GetMatchingAdaptiveSuccessResponse, unknown>,
	listCategory: ListCategoryName
): {
	data: Adaptive_item[];
	isLoading: boolean;
	isError: boolean;
} => {
	if (listCategory === "adaptive-item-categories") {
		return {
			data: adaptiveItems.data?.items ?? [],
			isLoading: adaptiveItems.isLoading,
			isError: adaptiveItems.isError,
		};
	}

	if (listCategory === "tool-adaptive") {
		return {
			data: toolAdaptive.data?.items.map((item) => item.adaptive_item) ?? [],
			isLoading: toolAdaptive.isLoading,
			isError: toolAdaptive.isError,
		};
	}

	if (listCategory === "adaptive-machine") {
		return {
			data:
				matchingAdaptive.data?.items.map(
					(item) => item.machine_direction_adaptive_item
				) ?? [],
			isLoading: matchingAdaptive.isLoading,
			isError: matchingAdaptive.isError,
		};
	}

	if (listCategory === "adaptive-workpiece") {
		return {
			data:
				matchingAdaptive.data?.items.map(
					(item) => item.workpiece_direction_adaptive_item
				) ?? [],
			isLoading: matchingAdaptive.isLoading,
			isError: matchingAdaptive.isError,
		};
	}

	return {
		data: [],
		isLoading: false,
		isError: false,
	};
};

export default function AdaptiveItemsStep({
	listCategory,
	categoryId,
	searchId,
}: Props) {
	const { addAdaptiveItem } = useToolAssemblyContext();
	const adaptiveItems = useGetAdaptiveItems(
		categoryId ?? undefined,
		listCategory === "adaptive-item-categories"
	);

	const toolAdaptive = useGetToolAdaptiveItems(
		searchId ?? undefined,
		undefined,
		listCategory === "tool-adaptive"
	);

	const matchingAdaptive = useGetAdaptiveMatchingItems(
		listCategory === "adaptive-workpiece" ? searchId ?? undefined : undefined,
		listCategory === "adaptive-machine" ? searchId ?? undefined : undefined,
		listCategory === "adaptive-machine" || listCategory === "adaptive-workpiece"
	);

	const { data, isError, isLoading } = filterData(
		adaptiveItems,
		toolAdaptive,
		matchingAdaptive,
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
						type: "Adaptive",
						data,
						keys: ["name", "lu", "bd", "wt"],
					}}
					onClick={addAdaptiveItem}
				/>
			</ModalBody>
		</ModalContent>
	);
}

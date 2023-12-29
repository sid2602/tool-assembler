import ToolAssemblerItemsTable from "@/components/molecues/toolAssemblerItemsTable/toolAssemblerItemsTable";
import {
	ListCategoryName,
	useToolAssemblyContext,
} from "@/contexts/toolAssembly.context";
import { useGetCuttingItems, useGetToolCuttingItems } from "@/hooks/products";
import {
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
} from "@chakra-ui/react";

interface Props {
	listCategory: ListCategoryName;
	categoryId: number | null | undefined;
	searchId: number | null | undefined;
}

export default function CuttingItemsStep({
	categoryId,
	listCategory,
	searchId,
}: Props) {
	const { addCuttingItem } = useToolAssemblyContext();

	const cuttingItems = useGetCuttingItems(
		categoryId ?? undefined,
		listCategory === "cutting-item-categories"
	);

	const toolCutting = useGetToolCuttingItems(
		listCategory === "tool-cutting" ? searchId ?? undefined : undefined,
		searchId ?? undefined,
		listCategory === "tool-cutting"
	);

	const data =
		listCategory === "cutting-item-categories"
			? cuttingItems.data?.items
			: toolCutting.data?.items.map((item) => item.cutting_item);
	const isLoading =
		listCategory === "cutting-item-categories"
			? cuttingItems.isLoading
			: toolCutting.isLoading;
	const isError =
		listCategory === "cutting-item-categories"
			? cuttingItems.isError
			: toolCutting.isError;

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
						type: "Cutting",
						data: data ?? [],
						keys: ["name", "ifs", "d1", "wt"],
					}}
					onClick={addCuttingItem}
				/>
			</ModalBody>
		</ModalContent>
	);
}

import {
	useGetToolAdaptiveItems,
	useGetToolCuttingItems,
	useGetToolItems,
} from "@/hooks/products";
import { AddIcon } from "@chakra-ui/icons";
import {
	Button,
	Image,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Text,
} from "@chakra-ui/react";

import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";

import { ListCategoryName } from "@/contexts/toolAssembly.context";
import { GetToolItemsSuccessResponse } from "@/pages/api/tool-items";
import { GetToolAdaptiveSuccessResponse } from "@/pages/api/tool-items/tool-adaptive";
import { GetToolCuttingSuccessResponse } from "@/pages/api/tool-items/tool-cutting";
import { Tool_item } from "@prisma/client";
import { UseQueryResult } from "react-query";
interface Props {
	listCategory: ListCategoryName;
	categoryId: number | null | undefined;
	searchId: number | null | undefined;
	onClick: (id: number) => Promise<void>;
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
	onClick,
}: Props) {
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
				{isLoading ? <div>loading...</div> : null}
				{data !== undefined ? (
					<>
						<Text fontSize="md" fontWeight="bold">
							Select your tool
						</Text>

						<TableContainer mt="2">
							<Table variant="simple">
								<Thead>
									<Tr>
										<Th>Image</Th>
										<Th>Name</Th>
										<Th isNumeric>lu</Th>
										<Th isNumeric>pl</Th>
										<Th isNumeric>wt</Th>
									</Tr>
								</Thead>
								<Tbody>
									{data.map((item) => (
										<Tr key={item.id}>
											<Td>
												<Image
													src={item.img ?? undefined}
													alt={item.name}
													width={20}
													height={20}
												/>
											</Td>
											<Td>{item.name}</Td>
											<Td isNumeric>{item?.LU}</Td>
											<Td isNumeric>{item?.PL}</Td>
											<Td isNumeric>{item?.WT}</Td>
											<Td>
												<Button w="10" h="10">
													<AddIcon onClick={() => onClick(item.id)} />
												</Button>
											</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</TableContainer>
					</>
				) : null}
			</ModalBody>

			<ModalFooter></ModalFooter>
		</ModalContent>
	);
}

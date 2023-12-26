import { ListCategoryName } from "@/contexts/toolAssembly.context";
import {
	useGetAdaptiveItems,
	useGetAdaptiveMatchingItems,
	useGetToolAdaptiveItems,
} from "@/hooks/products";
import { GetAdaptiveItemsSuccessResponse } from "@/pages/api/adaptive-items";
import { GetMatchingAdaptiveSuccessResponse } from "@/pages/api/adaptive-items/matching-adaptive-items";
import { GetToolAdaptiveSuccessResponse } from "@/pages/api/tool-items/tool-adaptive";
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
import { Adaptive_item } from "@prisma/client";
import { UseQueryResult } from "react-query";

interface Props {
	listCategory: ListCategoryName;
	categoryId: number | null | undefined;
	searchId: number | null | undefined;
	onClick: (id: number) => Promise<void>;
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
	onClick,
}: Props) {
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
										<Th isNumeric>bd</Th>
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
											<Td isNumeric>{item?.lu}</Td>
											<Td isNumeric>{item?.bd}</Td>
											<Td isNumeric>{item?.wt}</Td>
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

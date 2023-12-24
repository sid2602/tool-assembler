import { ListCategoryName } from "@/contexts/toolAssembly.context";
import { useGetCuttingItems, useGetToolCuttingItems } from "@/hooks/products";
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

interface Props {
	listCategory: ListCategoryName;
	categoryId: number | null | undefined;
	searchId: number | null | undefined;
	onClick: (id: number) => Promise<void>;
}

export default function CuttingItemsStep({
	categoryId,
	listCategory,
	searchId,
	onClick,
}: Props) {
	const cuttingItems = useGetCuttingItems(categoryId ?? undefined);

	const toolAdaptive = useGetToolCuttingItems(
		searchId ?? undefined,
		listCategory === "tool-cutting"
	);

	const data =
		listCategory === "adaptive-item-categories"
			? cuttingItems.data?.items
			: toolAdaptive.data?.items.map((item) => item.cutting_item);
	const isLoading =
		listCategory === "adaptive-item-categories"
			? cuttingItems.isLoading
			: toolAdaptive.isLoading;
	const isError =
		listCategory === "adaptive-item-categories"
			? cuttingItems.isError
			: toolAdaptive.isError;

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
										<Th isNumeric>ifs</Th>
										<Th isNumeric>d1</Th>
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
											<Td isNumeric>{item?.ifs}</Td>
											<Td isNumeric>{item?.d1}</Td>
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

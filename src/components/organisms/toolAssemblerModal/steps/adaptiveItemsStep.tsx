import { useGetAdaptiveItems } from "@/hooks/products";
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
	categoryId: number | null | undefined;
	onClick: (id: number) => void;
}

export default function AdaptiveItemsStep({ categoryId, onClick }: Props) {
	const { data, isLoading, isSuccess, isError } = useGetAdaptiveItems(
		categoryId ?? undefined
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
				{isSuccess && data !== undefined ? (
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
									{data.items.map((item) => (
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
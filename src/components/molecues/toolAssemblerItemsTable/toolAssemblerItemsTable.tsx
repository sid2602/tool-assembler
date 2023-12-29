import { AddIcon } from "@chakra-ui/icons";
import {
	Box,
	IconButton,
	Image,
	SkeletonText,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { Adaptive_item, Cutting_item, Tool_item } from "@prisma/client";
type AdaptiveItems = {
	keys: Array<keyof Adaptive_item>;
	data: Adaptive_item[];
	type: "Adaptive";
};

type ToolItems = {
	keys: Array<keyof Tool_item>;
	data: Tool_item[];
	type: "Tool";
};

type CuttingItems = {
	keys: Array<keyof Cutting_item>;
	data: Cutting_item[];
	type: "Cutting";
};

interface Props {
	tableData: AdaptiveItems | ToolItems | CuttingItems;
	isLoading: boolean;
	onClick: (id: number) => Promise<void>;
}
export default function ToolAssemblerItemsTable({
	tableData,
	isLoading,
	onClick,
}: Props) {
	if (isLoading) {
		return (
			<Box mt="2">
				<SkeletonText mt="4" noOfLines={25} spacing="4" skeletonHeight="2" />
			</Box>
		);
	}

	return (
		<TableContainer mt="2">
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Image</Th>
						{tableData.keys.map((key) => (
							<Th key={key}>{key}</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{tableData.data.map((item) => (
						<Tr key={item.id}>
							<Td>
								<Image
									src={item.img ?? undefined}
									alt={item.name}
									width={20}
									height={20}
								/>
							</Td>
							{tableData.keys.map((key) => (
								// @ts-ignore
								<Td key={key}>{item[key]}</Td>
							))}
							<Td>
								<IconButton
									w="10"
									h="10"
									icon={<AddIcon />}
									aria-label={"Add item"}
									onClick={async () => {
										await onClick(item.id);
									}}
								></IconButton>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}

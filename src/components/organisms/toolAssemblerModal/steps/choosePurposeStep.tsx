import CategoryItem from "@/components/molecues/categoryItem/categoryItem";
import { useGetToolItemCategories } from "@/hooks/categories";
import {
	Flex,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Text,
} from "@chakra-ui/react";

interface Props {
	onCategorySelect: (categoryId: number) => void;
}

export default function ChoosePurposeStep({ onCategorySelect }: Props) {
	// const { data: tools } = useGetToolItems(categoryId);
	const { data, isSuccess, isLoading, isError } = useGetToolItemCategories();

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
							What do you want to build ?
						</Text>
						<Flex my="4" gap="2">
							{data.items.map((item) => (
								<CategoryItem
									key={item.id}
									item={item}
									onClick={() => onCategorySelect(item.id)}
								/>
							))}
						</Flex>
					</>
				) : null}
			</ModalBody>

			<ModalFooter></ModalFooter>
		</ModalContent>
	);
}

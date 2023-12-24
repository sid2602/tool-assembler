import CategoryItem from "@/components/molecues/categoryItem/categoryItem";
import { ListCategoryName } from "@/contexts/toolAssembly.context";
import {
	useGetAdaptiveItemCategories,
	useGetCuttingItemCategories,
	useGetToolItemCategories,
} from "@/hooks/categories";
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
	onCategorySelect: (
		listCategoryName: ListCategoryName,
		categoryId: number
	) => void;
}

export default function ChoosePurposeStep({ onCategorySelect }: Props) {
	const {
		data: toolCategories,
		isSuccess: toolCategoriesIsSuccess,
		isLoading: toolCategoriesIsLoading,
		isError: toolCategoriesIsError,
	} = useGetToolItemCategories();

	const {
		data: adaptiveCategories,
		isSuccess: adaptiveCategoriesIsSuccess,
		isLoading: adaptiveCategoriesIsLoading,
		isError: adaptiveCategoriesIsError,
	} = useGetAdaptiveItemCategories();

	const {
		data: cuttingCategories,
		isSuccess: cuttingCategoriesIsSuccess,
		isLoading: cuttingCategoriesIsLoading,
		isError: cuttingCategoriesIsError,
	} = useGetCuttingItemCategories();

	if (
		toolCategoriesIsError ||
		adaptiveCategoriesIsError ||
		cuttingCategoriesIsError
	) {
		return;
	}

	return (
		<ModalContent maxW="1000px" maxH="700px" h="100%">
			<ModalHeader>Choose your first product</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<>
					{toolCategoriesIsLoading ? <div>loading...</div> : null}
					{toolCategoriesIsSuccess && toolCategories !== undefined ? (
						<>
							<Text fontSize="md" fontWeight="bold">
								Tool categories
							</Text>
							<Flex my="4" gap="2">
								{toolCategories.items.map((item) => (
									<CategoryItem
										key={item.id}
										item={item}
										onClick={() =>
											onCategorySelect("tool-item-categories", item.id)
										}
									/>
								))}
							</Flex>
						</>
					) : null}
					{adaptiveCategoriesIsLoading ? <div>loading...</div> : null}
					{adaptiveCategoriesIsSuccess && adaptiveCategories !== undefined ? (
						<>
							<Text fontSize="md" fontWeight="bold">
								Adaptive categories
							</Text>
							<Flex my="4" gap="2">
								{adaptiveCategories.items.map((item) => (
									<CategoryItem
										key={item.id}
										item={item}
										onClick={() =>
											onCategorySelect("adaptive-item-categories", item.id)
										}
									/>
								))}
							</Flex>
						</>
					) : null}

					{cuttingCategoriesIsLoading ? <div>loading...</div> : null}
					{cuttingCategoriesIsSuccess && cuttingCategories !== undefined ? (
						<>
							<Text fontSize="md" fontWeight="bold">
								Adaptive categories
							</Text>
							<Flex my="4" gap="2">
								{cuttingCategories.items.map((item) => (
									<CategoryItem
										key={item.id}
										item={item}
										onClick={() =>
											onCategorySelect("cutting-item-categories", item.id)
										}
									/>
								))}
							</Flex>
						</>
					) : null}
				</>
			</ModalBody>

			<ModalFooter></ModalFooter>
		</ModalContent>
	);
}

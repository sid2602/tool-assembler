import AuthenticatedCustomerPage from "@/components/templates/authenticatedCustomerPage";
import { useGetDictonaries } from "@/hooks/dictonary";
import { useGetSearchProduct } from "@/hooks/products";
import {
	Box,
	Container,
	Divider,
	Flex,
	Image,
	Spinner,
	Text,
} from "@chakra-ui/react";
import { Adaptive_item, Cutting_item, Tool_item } from "@prisma/client";
import { useRouter } from "next/router";

export const mapProductKeys = (
	product: Tool_item | Adaptive_item | Cutting_item | undefined
): string[] => {
	if (product === undefined) {
		return [];
	}

	return Object.entries(product)
		.filter(([key, value]) => value !== undefined && value !== null)
		.map(([key, value]) => key);
};

export default function Product() {
	const router = useRouter();
	const productName = router.query?.name;

	const product = useGetSearchProduct(productName);
	const dictonary = useGetDictonaries(
		product.data?.item.id,
		mapProductKeys(product.data?.item)
	);

	if (productName === undefined || Array.isArray(productName)) {
		return <div>Wrong product name</div>;
	}

	if (product.isError) {
		return null;
	}

	if (product.isLoading) {
		return (
			<Spinner
				position="absolute"
				left="50%"
				top="50%"
				transform="translate(-50%,-50%)"
				thickness="4px"
				speed="0.65s"
				emptyColor="gray.200"
				color="blue.500"
				size="xl"
			/>
		);
	}

	return (
		<AuthenticatedCustomerPage>
			{product.data === undefined ? (
				<div>Error</div>
			) : (
				<Container maxW="container.xl">
					<Flex flexDir="column" w="95%">
						<Text fontSize="xxx-large" fontWeight="bold">
							{product.data.item.name}
						</Text>
						<Flex justifyContent="space-between">
							<Box
								borderRadius="lg"
								boxShadow="lg"
								minW="500"
								minH="500"
								p="4"
								backgroundColor="white"
								display="flex"
								flexDir="column"
								alignItems="center"
							>
								<Text fontSize="xl" fontWeight="bold" textAlign="left" w="100%">
									Product Image
								</Text>
								<Divider borderColor="black" mt="2" />
								<Flex
									flexDirection="column"
									alignItems="center"
									justifyContent="center"
									h="100%"
								>
									<Image
										src={product.data.item?.img ?? ""}
										alt={product.data.item.name}
										w="60"
										h="60"
									/>
								</Flex>
							</Box>

							<Box
								borderRadius="lg"
								boxShadow="lg"
								minW="650"
								minH="500"
								p="4"
								backgroundColor="white"
								display="flex"
								flexDir="column"
								alignItems="center"
							>
								<Text fontSize="xl" fontWeight="bold" textAlign="left" w="100%">
									Product Data
								</Text>
								<Divider borderColor="black" mt="2" />

								<Box w="100%" px={8} py={2}>
									{dictonary.data?.item.map((item) => (
										<Box key={item.id} display="flex" my="2">
											<Box w="50%">{`${item.full_property_name} (${item.property_name})`}</Box>
											<Box w="50%" textAlign="right">
												{`
												
												${
													// @ts-ignore
													product.data.item?.[item.property_name]
												}
												${item.unit === null ? "" : item.unit}
											`}
											</Box>
										</Box>
									))}
								</Box>
							</Box>
						</Flex>
					</Flex>
				</Container>
			)}
		</AuthenticatedCustomerPage>
	);
}

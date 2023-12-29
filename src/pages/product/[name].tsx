import AuthenticatedCustomerPage from "@/components/templates/authenticatedCustomerPage";
import { useGetSearchProduct } from "@/hooks/products";
import { Box, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Product() {
	const router = useRouter();
	const productName = router.query?.name;

	const { data, isError, isLoading } = useGetSearchProduct(productName);

	if (productName === undefined || Array.isArray(productName)) {
		return <div>Wrong product name</div>;
	}

	if (isError) {
		return null;
	}

	if (isLoading) {
		return (
			<Spinner
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
			{data === undefined ? (
				<div>Error</div>
			) : (
				<Flex flexDir="column" w="80%">
					<Text fontSize="xxx-large" fontWeight="bold">
						{data.item.name}
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
									src={data.item?.img ?? ""}
									alt={data.item.name}
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

							<Box w="100%">
								<pre>
									{JSON.stringify(
										data.item,
										(key, value) => {
											if (value !== null && key !== "img") return value;
										},
										2
									)}
								</pre>
							</Box>
						</Box>
					</Flex>
				</Flex>
			)}
		</AuthenticatedCustomerPage>
	);
}

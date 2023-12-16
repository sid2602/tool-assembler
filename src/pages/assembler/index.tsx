import { useMe } from "@/hooks/auth";
import { Container, Flex } from "@chakra-ui/react";
import { QueryClient, dehydrate } from "react-query";
import AuthService from "../../services/auth";

export default function Assembler() {
	const { data, isLoading, isError } = useMe();

	if (isError) {
		return <>Error</>;
	}

	if (isLoading) {
		return <>loading</>;
	}

	return (
		<Flex
			h="100vh"
			justifyContent="center"
			backgroundImage={"/abstract.jpg"}
			backgroundSize="cover"
			backgroundPosition="25% 25%"
		>
			<Container maxW="container.md" mt="150"></Container>
		</Flex>
	);
}

export async function getServerSideProps() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["me"],
		queryFn: AuthService.me,
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

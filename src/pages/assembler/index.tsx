import Nav from "@/components/organisms/nav/nav";
import { useMe } from "@/hooks/auth";
import { Flex } from "@chakra-ui/react";
import { QueryClient, dehydrate } from "react-query";
import { default as AuthService } from "../../services/auth";

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
			<Nav />
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

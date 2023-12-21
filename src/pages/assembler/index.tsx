import ToolAssemblerItem from "@/components/molecues/toolAssemblerItem/toolAssemblerItem";
import ToolAssemblerModal from "@/components/organisms/toolAssemblerModal/toolAssemblerModal";
import AuthenticatedCustomerPage from "@/components/templates/authenticatedCustomerPage";
import { useMe } from "@/hooks/auth";
import { useDisclosure } from "@chakra-ui/react";
import { QueryClient, dehydrate } from "react-query";
import { default as AuthService } from "../../services/auth";

export default function Assembler() {
	const { data, isLoading, isError } = useMe();
	const { isOpen, onOpen, onClose } = useDisclosure();

	if (isError) {
		return <>Error</>;
	}

	if (isLoading) {
		return <>loading</>;
	}

	return (
		<AuthenticatedCustomerPage>
			<ToolAssemblerItem handleButton={onOpen} />
			<ToolAssemblerModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
		</AuthenticatedCustomerPage>
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

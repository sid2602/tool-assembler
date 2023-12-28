import ToolAssembler from "@/components/organisms/toolAssembler/toolAssembler";
import ToolAssemblerModal from "@/components/organisms/toolAssemblerModal/toolAssemblerModal";
import AuthenticatedCustomerPage from "@/components/templates/authenticatedCustomerPage";
import { useToolAssemblyContext } from "@/contexts/toolAssembly.context";
import { useMe } from "@/hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { QueryClient, dehydrate } from "react-query";
import { default as AuthService } from "../../services/auth";

export default function Assembler() {
	const { data, isLoading, isError } = useMe();
	const context = useToolAssemblyContext();
	const router = useRouter();
	const toolAssemblerId = router.query?.id;

	useEffect(() => {
		if (Array.isArray(toolAssemblerId)) {
			return;
		}

		if (toolAssemblerId === undefined) {
			context.setToolAssemblyId(toolAssemblerId);
		} else {
			context.setToolAssemblyId(Number(toolAssemblerId));
		}
	}, [toolAssemblerId]);

	if (isError) {
		return <>Error</>;
	}

	if (isLoading) {
		return <>loading</>;
	}

	return (
		<AuthenticatedCustomerPage>
			<ToolAssembler />
			<ToolAssemblerModal />
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

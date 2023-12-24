import ToolAssembler from "@/components/organisms/toolAssembler/toolAssembler";
import ToolAssemblerModal from "@/components/organisms/toolAssemblerModal/toolAssemblerModal";
import AuthenticatedCustomerPage from "@/components/templates/authenticatedCustomerPage";
import {
	ToolAssemblyContextProvider,
	useToolAssemblyContext,
} from "@/contexts/toolAssembly.context";
import { useMe } from "@/hooks/auth";
import { QueryClient, dehydrate } from "react-query";
import { default as AuthService } from "../../services/auth";

export default function index() {
	return (
		<ToolAssemblyContextProvider>
			<Assembler />
		</ToolAssemblyContextProvider>
	);
}

function Assembler() {
	const { data, isLoading, isError } = useMe();
	const context = useToolAssemblyContext();

	if (isError) {
		return <>Error</>;
	}

	if (isLoading) {
		return <>loading</>;
	}

	// const toolItem = context.toolAssembly?.used_tool_item?.[0].tool_item;

	return (
		<AuthenticatedCustomerPage>
			<ToolAssembler />
			{/* <ToolAssemblerItem
				handleButton={context.onOpen}
				item={
					toolItem !== undefined
						? { name: toolItem.name, img: toolItem.img }
						: undefined
				}
			/> */}
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

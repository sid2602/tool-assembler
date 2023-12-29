import AuthenticatedCustomerPage from "@/components/templates/authenticatedCustomerPage";
import { useMe } from "@/hooks/auth";
import { useGetCustomer } from "@/hooks/customer";
import {
	Box,
	IconButton,
	Spinner,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoEnter } from "react-icons/io5";
export default function Register() {
	const { data, isLoading } = useMe();
	const fullDataCustomer = useGetCustomer(data?.customer.id ?? undefined);
	const router = useRouter();
	const toolAssemblies = fullDataCustomer.data?.item?.tool_assemblies ?? [];

	if (isLoading || fullDataCustomer.isLoading) {
		return (
			<AuthenticatedCustomerPage>
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
			</AuthenticatedCustomerPage>
		);
	}

	if (fullDataCustomer.isSuccess && toolAssemblies.length === 0) {
		return (
			<AuthenticatedCustomerPage>
				<Box>No Data</Box>
			</AuthenticatedCustomerPage>
		);
	}

	return (
		<AuthenticatedCustomerPage>
			<TableContainer>
				<Table variant="simple" bg="white">
					<Thead>
						<Tr>
							<Th>Id</Th>
							<Th>name</Th>
							<Th>created at</Th>
							<Th>updated at</Th>
							<Th>visit</Th>
						</Tr>
					</Thead>
					<Tbody>
						{toolAssemblies.map((item) => (
							<Tr key={item.id}>
								<Td>{item.id}</Td>
								<Td>{item.name}</Td>
								<Td isNumeric>{item.created_at.toString()}</Td>
								<Td isNumeric>{item.updated_at.toString()}</Td>
								<Td isNumeric>
									<IconButton
										icon={<IoEnter />}
										aria-label={"Enter"}
										onClick={() => router.push(`/assembler?id=${item.id}`)}
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</AuthenticatedCustomerPage>
	);
}

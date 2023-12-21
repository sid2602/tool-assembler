import { Flex } from "@chakra-ui/react";
import Nav from "../organisms/nav/nav";

interface Props {
	children: JSX.Element | JSX.Element[];
}

export default function AuthenticatedCustomerPage({ children }: Props) {
	return (
		<Flex
			h="100vh"
			backgroundImage={"/abstract.jpg"}
			backgroundSize="cover"
			backgroundPosition="25% 25%"
			direction="column"
		>
			<Nav />
			<Flex justifyContent="center" alignItems="center" flex="1">
				{children}
			</Flex>
		</Flex>
	);
}

import { AddIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

interface Props {
	handleButton: () => void;
}

export default function ToolAssemblerItem({ handleButton }: Props) {
	return (
		<Box
			borderRadius="lg"
			boxShadow="lg"
			w="40"
			h="40"
			p="2"
			backgroundColor="white"
			display="flex"
			flexDir="column"
			position="relative"
			alignItems="center"
			justifyContent="flex-end"
			// flexDir="column"
		>
			<AddIcon
				as="button"
				boxSize={8}
				cursor="pointer"
				flex="1"
				position="absolute"
				left="50%"
				top="50%"
				transform="translate(-50%,-50%)"
				onClick={handleButton}
			/>
			{/* <Text fontSize="sm">Something</Text> */}
		</Box>
	);
}

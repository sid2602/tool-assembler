import { Box, Image, Text } from "@chakra-ui/react";

interface Props {
	item: {
		name: string;
		img: string | null;
	};
}

export default function ToolAssemblerItem({ item }: Props) {
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
			<>
				<Image
					alt={item.name}
					src={item?.img ?? ""}
					flex="1"
					position="absolute"
					left="50%"
					top="35%"
					transform="translate(-50%,-50%)"
					w="40"
					h="40"
				/>
				<Text fontSize="sm" textAlign="center">
					{item.name}
				</Text>
			</>
		</Box>
	);
}

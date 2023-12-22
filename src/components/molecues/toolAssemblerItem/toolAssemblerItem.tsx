import { AddIcon } from "@chakra-ui/icons";
import { Box, Image, Text } from "@chakra-ui/react";

interface Props {
	item?: {
		name: string;
		img: string | null;
	};

	handleButton: () => void;
}

export default function ToolAssemblerItem({ item, handleButton }: Props) {
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
			{item === undefined ? (
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
			) : (
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
			)}
		</Box>
	);
}

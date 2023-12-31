import { Box, Image, Text } from "@chakra-ui/react";
import { Tool_item_category } from "@prisma/client";

interface Props {
	item: Tool_item_category;
	onClick: () => void;
}

export default function CategoryItem({ item, onClick }: Props) {
	return (
		<Box
			as="button"
			borderRadius="lg"
			boxShadow="lg"
			w="40"
			h="40"
			p="4"
			backgroundColor="gray.50"
			display="flex"
			flexDir="column"
			position="relative"
			alignItems="center"
			justifyContent="center"
			_hover={{ bg: "gray.100", transition: "0.1s" }}
			overflow="hidden"
			textOverflow="ellipsis"
			onClick={onClick}
		>
			<Image src={item.img} alt={item.name} flex="1" />
			<Text fontSize="sm">{item.name}</Text>
		</Box>
	);
}

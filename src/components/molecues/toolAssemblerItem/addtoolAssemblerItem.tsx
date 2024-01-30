import { AddIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

type Direction = "center" | "left" | "right" | "right-top" | "right-bottom";
interface Props {
	handleButton: () => void;
	direction: Direction;
}

interface Positon {
	top?: string | undefined;
	left?: string | undefined;
	right?: string | undefined;
	bottom?: string | undefined;
}

const calculatePosition = (direction: Direction): Positon => {
	if (direction === "center") {
		return {};
	}

	if (direction === "left") {
		return {
			left: "-110%",
		};
	}

	if (direction === "right") {
		return {
			top: "0%",
			right: "-110%",
		};
	}

	if (direction === "right-top") {
		return {
			right: "-110%",
			top: "-110%",
		};
	}

	if (direction === "right-bottom") {
		return {
			right: "-110%",
			bottom: "-110%",
		};
	}

	return {};
};

export default function AddToolAssemblerItem({
	handleButton,
	direction,
}: Props) {
	const { top, left, right, bottom } = calculatePosition(direction);

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
			position="absolute"
			alignItems="center"
			top={top}
			left={left}
			right={right}
			bottom={bottom}
			justifyContent="flex-end"
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
		</Box>
	);
}

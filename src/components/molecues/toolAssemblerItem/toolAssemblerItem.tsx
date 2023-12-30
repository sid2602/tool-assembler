import {
	useDeleteAdaptiveItem,
	useDeleteCuttinglItem,
	useDeleteToolItem,
} from "@/hooks/toolAssembly";
import { DeleteIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { Box, Fade, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

interface Props {
	item: {
		name: string;
		img: string | null;
	};
	usedItemId: number;
	type: "tool" | "cutting" | "adaptive";
	canBeDeleted: boolean;
}

export default function ToolAssemblerItem({
	item,
	usedItemId,
	type,
	canBeDeleted,
}: Props) {
	const [isHovering, setIsHovering] = useState(false);

	const deleteAdaptiveItem = useDeleteAdaptiveItem(usedItemId);
	const deleteToolItem = useDeleteToolItem(usedItemId);
	const deleteCuttingItem = useDeleteCuttinglItem(usedItemId);

	const removeItemFromToolAssembler = async () => {
		if (type === "adaptive") {
			await deleteAdaptiveItem.mutateAsync();
		}
		if (type === "tool") {
			await deleteToolItem.mutateAsync();
		}
		if (type === "cutting") {
			await deleteCuttingItem.mutateAsync();
		}
	};

	return (
		<Box
			borderRadius="lg"
			boxShadow="lg"
			w="175px"
			h="175px"
			p="2"
			backgroundColor="white"
			display="flex"
			flexDir="column"
			position="relative"
			alignItems="center"
			justifyContent="flex-end"
			onMouseOver={() => {
				setIsHovering(true);
			}}
			onMouseOut={() => {
				setIsHovering(false);
			}}
		>
			<>
				<Image
					alt={item.name}
					src={item?.img ?? ""}
					flex="1"
					position="absolute"
					left="50%"
					top="40%"
					transform="translate(-50%,-50%)"
					w="130px"
					h="130px"
				/>
				<Text fontSize="sm" textAlign="center">
					{item.name}
				</Text>

				<Fade in={isHovering}>
					<Flex
						w="100%"
						h="100%"
						position="absolute"
						left="50%"
						top="50%"
						transform="translate(-50%,-50%)"
						zIndex={1}
						justifyContent="flex-end"
					>
						<IconButton
							as={Link}
							href={"/product/" + item.name}
							target="_blank"
							aria-label={"Product info"}
							icon={<InfoOutlineIcon />}
						/>
						{canBeDeleted === false ? null : (
							<IconButton
								aria-label={"Delete"}
								onClick={removeItemFromToolAssembler}
								icon={<DeleteIcon />}
							/>
						)}
					</Flex>

					<Box
						w="100%"
						h="100%"
						position="absolute"
						left="50%"
						top="50%"
						transform="translate(-50%,-50%)"
						bgColor="rgba(0,0,0,0.25)"
						borderRadius="lg"
					/>
				</Fade>
			</>
		</Box>
	);
}

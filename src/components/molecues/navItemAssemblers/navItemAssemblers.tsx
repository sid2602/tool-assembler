import { useToolAssemblyContext } from "@/contexts/toolAssembly.context";
import { useGetToolAssembly } from "@/hooks/toolAssembly";
import { Tool_assembly } from "@/pages/api/tool-assembly/[id]";
import { checkToolAssemblyHaveItem } from "@/utils/client/checkToolAssemblyHaveItem";
import {
	Divider,
	Flex,
	IconButton,
	Image,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { Assembly_item } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import { GiScrew } from "react-icons/gi";

type AssemblyItemWithQuantity = {
	assemblyItem: Assembly_item;
	quantity: number;
};

const gropuAssemblies = (
	toolAssembly: Tool_assembly | undefined
): AssemblyItemWithQuantity[] => {
	if (toolAssembly === undefined) {
		return [];
	}

	const toolItemsAssemblies: AssemblyItemWithQuantity[][] =
		toolAssembly.used_tool_item.map((item) =>
			item.tool_item.connecting_assembly_item.map((assembly) => ({
				assemblyItem: assembly.assembly_item,
				quantity: assembly.quantity,
			}))
		);
	const adaptiveItemsAssemblies: AssemblyItemWithQuantity[][] =
		toolAssembly.used_adaptive_item.map((item) =>
			item.adaptive_item.connecting_assembly_item.map((assembly) => ({
				assemblyItem: assembly.assembly_item,
				quantity: assembly.quantity,
			}))
		);

	const concatedArrays = [
		...toolItemsAssemblies,
		...adaptiveItemsAssemblies,
	].flat();

	const groupedItems: AssemblyItemWithQuantity[] = [];

	concatedArrays.forEach((item) => {
		const index = groupedItems.findIndex(
			(groupedItem) => groupedItem.assemblyItem.id === item.assemblyItem.id
		);

		if (index === -1) {
			groupedItems.push(item);
			return;
		}

		groupedItems[index].quantity += item.quantity;
	});

	return groupedItems;
};

export default function NavItemAssemblers() {
	const { toolAssemblyId } = useToolAssemblyContext();
	const { onOpen, onClose, isOpen } = useDisclosure();
	const toolAssembly = useGetToolAssembly(toolAssemblyId);
	const router = useRouter();

	const toolAssemblyData = toolAssembly.data?.item ?? undefined;

	const isAvailable =
		router.pathname.includes("/assembler") &&
		checkToolAssemblyHaveItem(toolAssemblyData);

	if (isAvailable === false) {
		return null;
	}

	const groupedAssembliesItems = gropuAssemblies(toolAssemblyData);

	return (
		<Popover isOpen={isOpen}>
			<PopoverTrigger>
				<IconButton
					mx={2}
					icon={<GiScrew />}
					aria-label={"Save"}
					onClick={onOpen}
				/>
			</PopoverTrigger>
			<PopoverContent w="270px">
				<PopoverArrow />
				<PopoverHeader pt={4} fontWeight="bold" border="0" textAlign="left">
					Assemblies
				</PopoverHeader>
				<PopoverCloseButton ml="2" onClick={onClose} />
				<PopoverBody textAlign="left">
					{groupedAssembliesItems.length === 0 ? (
						// eslint-disable-next-line react/no-unescaped-entities
						<div>This item doesn't have assemblies</div>
					) : (
						groupedAssembliesItems.map((item) => (
							<React.Fragment key={item.assemblyItem.id}>
								<Flex alignItems="center" justifyContent="space-between">
									<Flex alignItems="center" gap="20px">
										<Image
											w="40px"
											h="40px"
											src={item.assemblyItem.img ?? ""}
											alt={item.assemblyItem.name}
										/>
										<Text fontSize="sm" fontWeight="bold">
											{item.assemblyItem.name}
										</Text>
									</Flex>

									<Text fontSize="sm">quantity: {item.quantity}</Text>
								</Flex>
								<Divider />
							</React.Fragment>
						))
					)}
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}

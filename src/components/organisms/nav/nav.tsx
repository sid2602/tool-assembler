import NavItemAssemblers from "@/components/molecues/navItemAssemblers/navItemAssemblers";
import NavItemDownloadPDF from "@/components/molecues/navItemDownloadPDF/navItemDownloadPDF";
import NavSaveDeleteAssembly from "@/components/molecues/navSaveAssembly/navSaveDeleteAssembly";
import { useMe } from "@/hooks/auth";
import {
	Avatar,
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { default as AuthService } from "../../../services/auth";

export default function Nav() {
	const { data, isLoading, isError } = useMe();
	const router = useRouter();
	if (isError === true) {
		return;
	}

	if (isLoading === true) {
		return;
	}

	if (data === undefined) {
		return;
	}
	return (
		<Flex
			bg="white"
			w="100%"
			p={2}
			color="black"
			h="4rem"
			textAlign="right"
			justifyContent="space-between"
			alignItems="center"
		>
			<Flex alignItems="center">
				<Button onClick={() => router.push("/assembler")}>
					<Text fontSize="xl" fontWeight="bold" mr="2">
						Assembler
					</Text>
				</Button>
				<NavSaveDeleteAssembly />
				<NavItemAssemblers />
				<NavItemDownloadPDF />
			</Flex>
			<Flex alignItems="center">
				<Text fontSize="sm" fontWeight="bold" mr="2">
					Hello {data.customer.first_name + " " + data.customer.last_name}
				</Text>

				<Menu>
					<MenuButton as={Avatar} />
					<MenuList textAlign="right">
						<MenuItem as={Link} href={"/profile/saved-tool-assembler"}>
							Saved tool assemblers
						</MenuItem>
						<MenuItem as={Link} href={"/profile/settings"}>
							Settings
						</MenuItem>
						<MenuItem
							onClick={async () => {
								await AuthService.logout();
								Router.replace("/auth/login");
							}}
						>
							Logout
						</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		</Flex>
	);
}

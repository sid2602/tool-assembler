import { useToolAssemblyContext } from "@/contexts/toolAssembly.context";
import { useMe } from "@/hooks/auth";
import { useGetToolAssembly } from "@/hooks/toolAssembly";
import {
	Avatar,
	Button,
	Flex,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Text,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { MdOutlineSave, MdRemoveCircleOutline } from "react-icons/md";
import * as Yup from "yup";
import { default as AuthService } from "../../../services/auth";

export const saveToolAssemblySchema = Yup.object().shape({
	name: Yup.string().required(),
});

export default function Nav() {
	const { data, isLoading, isError } = useMe();
	const { toolAssemblyId, handleUpdateToolAssembly } = useToolAssemblyContext();
	const { data: toolAssemblyData } = useGetToolAssembly(toolAssemblyId);
	const toolAssembly = toolAssemblyData?.item ?? undefined;
	const router = useRouter();
	const toast = useToast({});
	const { onOpen, onClose, isOpen } = useDisclosure();

	const formik = useFormik({
		initialValues: {
			name: "",
		},
		validationSchema: saveToolAssemblySchema,
		onSubmit: async (values) => {
			try {
				await handleUpdateToolAssembly({
					customer_id: data?.customer.id ?? null,
					name: values.name,
				});
				toast({
					title: "Success",
					description: "successfully saved",
					status: "success",
					duration: 5000,
					isClosable: true,
					position: "top",
				});

				onClose();
			} catch (e) {
				const errorMessage = axios.isAxiosError(e)
					? e.response?.data?.message
					: "Unknow error";

				toast({
					title: "Error",
					description: errorMessage,
					status: "error",
					duration: 5000,
					isClosable: true,
					position: "top",
				});
			}
		},
	});

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
				{router.asPath.includes("/assembler") &&
				toolAssembly?.id !== undefined ? (
					<Popover isOpen={isOpen}>
						{toolAssembly?.name === null &&
						toolAssembly?.customer_id === null ? (
							<>
								<PopoverTrigger>
									<IconButton
										mx={2}
										icon={<MdOutlineSave />}
										aria-label={"Save"}
										onClick={onOpen}
									/>
								</PopoverTrigger>
								<PopoverContent>
									<PopoverArrow />
									<PopoverHeader
										pt={4}
										fontWeight="bold"
										border="0"
										textAlign="left"
									>
										Save your tool
									</PopoverHeader>
									<PopoverCloseButton ml="2" />
									<PopoverBody textAlign="left">
										<form onSubmit={formik.handleSubmit}>
											<FormControl>
												<FormLabel>Set name for your tool</FormLabel>
												<Input
													name="name"
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.name}
												/>
											</FormControl>
											<Button mt="2" type="submit">
												Save
											</Button>
										</form>
									</PopoverBody>
								</PopoverContent>
							</>
						) : (
							<IconButton
								mx={2}
								icon={<MdRemoveCircleOutline />}
								aria-label={"Save"}
								onClick={async () => {
									await handleUpdateToolAssembly({
										name: null,
										customer_id: null,
									});
									onClose();
								}}
							/>
						)}
					</Popover>
				) : null}
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

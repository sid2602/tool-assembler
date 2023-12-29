import { useToolAssemblyContext } from "@/contexts/toolAssembly.context";
import { useMe } from "@/hooks/auth";
import { useGetToolAssembly } from "@/hooks/toolAssembly";
import { Tool_assembly } from "@/pages/api/tool-assembly/[id]";
import { checkSomeQueryParam } from "@/utils/client/checkSomeQueryParam";
import {
	Button,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { MdOutlineSave, MdRemoveCircleOutline } from "react-icons/md";
import * as Yup from "yup";

export const saveToolAssemblySchema = Yup.object().shape({
	name: Yup.string().required(),
});

const checkToolAssemblyHaveItem = (
	toolAssembly: Tool_assembly | undefined
): boolean => {
	if (toolAssembly === undefined) return false;
	const arrays = [
		toolAssembly.used_adaptive_item,
		toolAssembly.used_assembly_item,
		toolAssembly.used_cutting_item,
		toolAssembly.used_tool_item,
	];

	return arrays.some((array) => array.length > 0);
};

export default function NavSaveDeleteAssembly() {
	const { toolAssemblyId, handleUpdateToolAssembly } = useToolAssemblyContext();
	const me = useMe();
	const { onOpen, onClose, isOpen } = useDisclosure();
	const toolAssembly = useGetToolAssembly(toolAssemblyId);
	const toast = useToast({});
	const router = useRouter();
	const isError = checkSomeQueryParam(true, "isError", me, toolAssembly);
	const isLoading = checkSomeQueryParam(true, "isLoading", me, toolAssembly);
	const toolAssemblyData = toolAssembly.data?.item ?? undefined;

	const isAvailable =
		router.pathname.includes("/assembler") &&
		checkToolAssemblyHaveItem(toolAssemblyData);

	const isAlreadyLiked =
		toolAssemblyData?.name !== null && toolAssemblyData?.customer_id !== null;

	const formik = useFormik({
		initialValues: {
			name: "",
		},
		validationSchema: saveToolAssemblySchema,
		onSubmit: async (values) => {
			try {
				await handleUpdateToolAssembly({
					customer_id: me.data?.customer.id ?? null,
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

	if (isError) {
		return null;
	}

	if (isLoading) {
		return null;
	}

	if (isAvailable && isAlreadyLiked) {
		return (
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
		);
	}

	if (isAvailable) {
		return (
			<Popover isOpen={isOpen}>
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
					<PopoverHeader pt={4} fontWeight="bold" border="0" textAlign="left">
						Save your tool
					</PopoverHeader>
					<PopoverCloseButton ml="2" onClick={onClose} />
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
			</Popover>
		);
	}
}

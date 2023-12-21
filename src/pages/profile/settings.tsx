import AuthenticatedCustomerPage from "@/components/templates/authenticatedCustomerPage";
import { useMe } from "@/hooks/auth";
import { useUpdateCustomer } from "@/hooks/customer";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Center,
	Container,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Stack,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export const EditCustomerSchema = Yup.object().shape({
	email: Yup.string().email().required(),
	first_name: Yup.string().required(),
	last_name: Yup.string().required(),
	password: Yup.string().min(3).required(),
});

export default function Register() {
	const { data, isError } = useMe();

	const { mutateAsync, isLoading } = useUpdateCustomer();
	const toast = useToast({});

	const formik = useFormik({
		initialValues: {
			email: "",
			first_name: "",
			last_name: "",
			password: "",
		},
		validationSchema: EditCustomerSchema,
		onSubmit: async (values) => {
			try {
				if (data?.customer.id === undefined) {
					throw Error();
				}

				await mutateAsync({ id: data.customer.id, data: values });
				toast({
					description: "Account updated",
					duration: 5000,
					status: "success",
					isClosable: true,
					position: "top",
				});
			} catch (e) {
				const errorMessage = axios.isAxiosError(e)
					? e.response?.data?.error
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

	const isEmailInvalid =
		formik.errors.email !== undefined && formik.touched.email === true;

	const isFirstNameInvalid =
		formik.errors.first_name !== undefined &&
		formik.touched.first_name === true;

	const isLastNameInvalid =
		formik.errors.last_name !== undefined && formik.touched.last_name === true;

	const isPasswordInvalid =
		formik.errors.password !== undefined && formik.touched.password === true;

	return (
		<AuthenticatedCustomerPage>
			<Container maxW="container.sm">
				<Card>
					<CardHeader>
						<Heading>
							<Center>Edit your data</Center>
						</Heading>
					</CardHeader>

					<CardBody>
						<form onSubmit={formik.handleSubmit}>
							<Stack>
								<FormControl isInvalid={isEmailInvalid}>
									<FormLabel>Email</FormLabel>
									<Input
										placeholder="Please enter email"
										name="email"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.email}
									/>

									<FormErrorMessage>{formik.errors.email}</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={isFirstNameInvalid}>
									<FormLabel>First name</FormLabel>
									<Input
										placeholder="Please enter first name"
										name="first_name"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.first_name}
									/>

									<FormErrorMessage>
										{formik.errors.first_name}
									</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={isLastNameInvalid}>
									<FormLabel>Last name</FormLabel>
									<Input
										placeholder="Please enter last name"
										name="last_name"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.last_name}
									/>

									<FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={isPasswordInvalid}>
									<FormLabel>Password</FormLabel>
									<Input
										placeholder="Please enter password"
										name="password"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.password}
										type="password"
									/>
									<FormErrorMessage>{formik.errors.password}</FormErrorMessage>
								</FormControl>
								<Button mt="2" type="submit" isLoading={isLoading}>
									Edit your profile
								</Button>
							</Stack>
						</form>
					</CardBody>
				</Card>
			</Container>
		</AuthenticatedCustomerPage>
	);
}

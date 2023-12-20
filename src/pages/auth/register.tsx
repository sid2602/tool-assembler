import { useRegister } from "@/hooks/auth";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Center,
	Container,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import Router from "next/router";
import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
	email: Yup.string().email().required(),
	first_name: Yup.string().required(),
	last_name: Yup.string().required(),
	password: Yup.string().min(3).required(),
});

export default function Register() {
	const { mutateAsync, isLoading } = useRegister();
	const toast = useToast({});

	const formik = useFormik({
		initialValues: {
			email: "",
			first_name: "",
			last_name: "",
			password: "",
		},
		validationSchema: registerSchema,
		onSubmit: async (values) => {
			try {
				await mutateAsync(values);
				Router.replace("/assembler");
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
		<Flex
			h="100vh"
			justifyContent="center"
			alignItems="center"
			backgroundImage={"/abstract.jpg"}
			backgroundSize="cover"
			backgroundPosition="25% 25%"
		>
			<Container maxW="container.sm">
				<Card>
					<CardHeader>
						<Heading>
							<Center>Register</Center>
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
									Sign up
								</Button>
							</Stack>
							<Text fontSize="sm">
								Already have account?{" "}
								<Link href={"/auth/login"} passHref>
									<Text as={"span"} color="teal.500">
										Login now
									</Text>
								</Link>
							</Text>
						</form>
					</CardBody>
				</Card>
			</Container>
		</Flex>
	);
}

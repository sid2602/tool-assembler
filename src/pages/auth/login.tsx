import { useLogin } from "@/hooks/auth";
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
import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
	email: Yup.string().email().required(),
	password: Yup.string().min(3).required(),
});

export default function Login() {
	const { mutateAsync, isLoading } = useLogin();
	const toast = useToast({});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: LoginSchema,
		onSubmit: async (values) => {
			try {
				await mutateAsync(values);
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
							<Center>Login</Center>
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
								<Button type="submit" mt="2" isLoading={isLoading}>
									Sign in
								</Button>
								<Text fontSize="sm">
									Not registered yet?{" "}
									<Link href={"/auth/register"} passHref>
										<Text as={"span"} color="teal.500">
											Register now
										</Text>
									</Link>
								</Text>
							</Stack>
						</form>
					</CardBody>
				</Card>
			</Container>
		</Flex>
	);
}

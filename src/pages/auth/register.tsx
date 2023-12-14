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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
	email: Yup.string().email().required(),
	firstName: Yup.string().required(),
	lastName: Yup.string().required(),
	password: Yup.string().min(3).required(),
});

export default function Register() {
	const formik = useFormik({
		initialValues: {
			email: "",
			firstName: "",
			lastName: "",
			password: "",
		},
		validationSchema: loginSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	const isEmailInvalid =
		formik.errors.email !== undefined && formik.touched.email === true;

	const isFirstNameInvalid =
		formik.errors.firstName !== undefined && formik.touched.firstName === true;

	const isLastNameInvalid =
		formik.errors.lastName !== undefined && formik.touched.lastName === true;

	const isPasswordInvalid =
		formik.errors.password !== undefined && formik.touched.password === true;

	return (
		<Flex h="100vh" justifyContent="center" alignItems="center">
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
										name="firstName"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.firstName}
									/>

									<FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={isLastNameInvalid}>
									<FormLabel>Last name</FormLabel>
									<Input
										placeholder="Please enter last name"
										name="lastName"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.lastName}
									/>

									<FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
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
								<Button mt="2" type="submit">
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

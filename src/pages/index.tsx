import {
	Box,
	Button,
	Center,
	Container,
	Flex,
	Heading,
	Icon,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdOutlineHandyman } from "react-icons/md";

export default function Home() {
	return (
		<Flex
			h="100vh"
			justifyContent="center"
			backgroundImage={"/gradient.jpg"}
			backgroundSize="cover"
			backgroundPosition="65% 25%"
		>
			<Container maxW="container.md" mt="150">
				<Stack>
					<Heading mt="8">
						<Center>Welcome to Tool builder</Center>
					</Heading>
					<Box mt="8">
						<Center>
							<Text maxW="md" fontSize="2xl" textAlign="center">
								Empower yourself with an innovative application designed for
								crafting personalized machining tools
							</Text>
						</Center>
					</Box>
					<Image
						mt="8"
						mb="5"
						src="/preview.png"
						alt={"tool builder"}
						maxW="100%"
						height="450"
						borderRadius="10"
					/>

					<Center>
						<Button
							as={Link}
							size="md"
							width="sm"
							leftIcon={<Icon as={MdOutlineHandyman} />}
							rightIcon={<Icon as={MdOutlineHandyman} />}
							href="/auth/login"
						>
							Create your tool
						</Button>
					</Center>
				</Stack>
			</Container>
		</Flex>
	);
}

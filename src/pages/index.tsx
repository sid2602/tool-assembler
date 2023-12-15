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
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
								luctus augue nec nulla pharetra eleifend. Vivamus dignissim
								metus eros, id euismod dolor bibendum id.
							</Text>
						</Center>
					</Box>
					<Image
						mt="8"
						mb="5"
						src="https://picsum.photos/200/300"
						alt={"tool builder"}
						maxW="100%"
						height="250"
					/>

					<Center>
						<Button
							size="md"
							width="sm"
							leftIcon={<Icon as={MdOutlineHandyman} />}
							rightIcon={<Icon as={MdOutlineHandyman} />}
						>
							Create your tool
						</Button>
					</Center>
				</Stack>
			</Container>
		</Flex>
	);
}

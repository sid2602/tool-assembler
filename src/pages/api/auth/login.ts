import { LoginSchema } from "@/pages/auth/login";
import { comparePasswords } from "@/utils/server/passwordHash";
import { generateToken } from "@/utils/server/token";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type LoginResponse =
	| {
			jwt: string;
	  }
	| {
			error: string;
	  };

export default async function POST(
	request: NextApiRequest,
	response: NextApiResponse<LoginResponse>
) {
	try {
		const { data } = request.body;
		const isBodyValid = await LoginSchema.isValid(data);

		if (isBodyValid === false) {
			return response.json({
				error: "Wrong body",
			});
		}

		const customerData = await LoginSchema.validate(data);

		const customer = await prisma.customer.findUnique({
			where: { email: customerData.email },
		});

		if (customer === null) {
			return response.status(400).json({
				error: "Wrong email or password",
			});
		}

		const isPasswordMatching = await comparePasswords(
			customerData.password,
			customer.password
		);

		if (isPasswordMatching === false) {
			return response.status(400).json({
				error: "Wrong email or password",
			});
		}

		const jwt = generateToken(customer);

		if (jwt === null) {
			return response.status(400).json({
				error: "Unknown error",
			});
		}

		response.setHeader("Set-Cookie", `token=${jwt}; Path=/; HttpOnly`);

		return response.status(200).json({ jwt });
	} catch (e) {
		return response.status(400).json({
			error: "Unknown error",
		});
	}
}

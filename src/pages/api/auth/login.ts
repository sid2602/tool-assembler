import { LoginSchema } from "@/pages/auth/login";
import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { comparePasswords } from "@/utils/server/passwordHash";
import { generateToken } from "@/utils/server/token";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type LoginSuccessResponse = {
	type: "Success";
	jwt: string;
};

export type LoginResponse = LoginSuccessResponse | ServerErrorResponse;

export default async function POST(
	request: NextApiRequest,
	response: NextApiResponse<LoginResponse>
) {
	try {
		const { data } = request.body;
		const isBodyValid = await LoginSchema.isValid(data);

		if (isBodyValid === false) {
			return response.json({
				type: "Error",
				message: "Wrong body",
			});
		}

		const customerData = await LoginSchema.validate(data);

		const customer = await prisma.customer.findUnique({
			where: { email: customerData.email },
		});

		if (customer === null) {
			return response.status(400).json({
				type: "Error",
				message: "Wrong email or password",
			});
		}

		const isPasswordMatching = await comparePasswords(
			customerData.password,
			customer.password
		);

		if (isPasswordMatching === false) {
			return response.status(400).json({
				type: "Error",
				message: "Wrong email or password",
			});
		}

		const jwt = generateToken(customer);

		if (jwt === null) {
			return response.status(400).json({
				type: "Error",

				message: "Unknown error",
			});
		}

		response.setHeader("Set-Cookie", `token=${jwt}; Path=/; HttpOnly`);

		return response.status(200).json({ type: "Success", jwt });
	} catch (e) {
		return response.status(400).json({
			type: "Error",
			message: "Unknown error",
		});
	}
}

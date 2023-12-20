import { registerSchema } from "@/pages/auth/register";
import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { hashPassword } from "@/utils/server/passwordHash";
import { generateToken } from "@/utils/server/token";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type RegisterSuccessResponse = {
	type: "Success";
	jwt: string;
};

export type RegisterResponse = RegisterSuccessResponse | ServerErrorResponse;

export default async function POST(
	request: NextApiRequest,
	response: NextApiResponse<RegisterResponse>
) {
	try {
		const { data } = request.body;
		const isBodyValid = await registerSchema.isValid(data);

		if (isBodyValid === false) {
			return response.status(400).json({
				type: "Error",
				message: "Wrong body",
			});
		}

		const customerData = await registerSchema.validate(data);
		const hashedPassword = await hashPassword(customerData.password);

		const customerWithThisSameEmail = await prisma.customer.findFirst({
			where: { email: customerData.email },
		});

		if (customerWithThisSameEmail !== null) {
			return response.status(400).json({
				type: "Error",
				message: "Customer with this email already exists",
			});
		}

		const customer = await prisma.customer.create({
			data: { ...customerData, password: hashedPassword },
		});
		const jwt = generateToken(customer);

		if (jwt === null) {
			return response.status(400).json({
				type: "Error",
				message: "Unknown error",
			});
		}

		response.setHeader("Set-Cookie", `token=${jwt}; Path=/; HttpOnly`);
		return response.status(201).json({ type: "Success", jwt });
	} catch (e) {
		return response.status(400).json({
			type: "Error",
			message: "Unknown error",
		});
	}
}

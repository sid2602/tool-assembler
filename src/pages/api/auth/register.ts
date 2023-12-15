import { registerSchema } from "@/pages/auth/register";
import { hashPassword } from "@/utils/server/passwordHash";
import { generateToken } from "@/utils/server/token";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type RegisterResponse =
	| {
			jwt: string;
	  }
	| {
			error: string;
	  };

export default async function POST(
	request: NextApiRequest,
	response: NextApiResponse<RegisterResponse>
) {
	try {
		const { data } = request.body;
		const isBodyValid = await registerSchema.isValid(data);

		if (isBodyValid === false) {
			return response.status(400).json({
				error: "Wrong body",
			});
		}

		const customerData = await registerSchema.validate(data);
		const hashedPassword = await hashPassword(customerData.password);

		const customerWithThisSameEmail = await prisma.customer.findFirst({
			where: { email: customerData.email },
		});

		if (customerWithThisSameEmail !== null) {
			return response.status(400).json({
				error: "Customer with this email already exists",
			});
		}

		const customer = await prisma.customer.create({
			data: { ...customerData, password: hashedPassword },
		});
		const jwt = generateToken(customer);

		if (jwt === null) {
			return response.status(400).json({
				error: "Unknown error",
			});
		}

		response.setHeader("Set-Cookie", `token=${jwt}; Path=/; HttpOnly`);
		return response.status(201).json({ jwt });
	} catch (e) {
		return response.status(400).json({
			error: "Unknown error",
		});
	}
}

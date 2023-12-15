import { loginSchema } from "@/pages/auth/login";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

async function comparePasswords(
	plainPassword: string,
	hashedPassword: string
): Promise<boolean> {
	return await bcrypt.compare(plainPassword, hashedPassword);
}

export function generateToken(payload: any): string | null {
	const secret = process.env.JWT_SECRET;

	if (secret === undefined) {
		return null;
	}

	return jwt.sign(payload, secret, { expiresIn: "1h" });
}

const prisma = new PrismaClient();

export default async function POST(
	request: NextApiRequest,
	response: NextApiResponse
) {
	try {
		const { body } = request;
		const isBodyValid = await loginSchema.isValid(body);

		if (isBodyValid === false) {
			return response.json({
				error: "Wrong body",
			});
		}

		const customerData = await loginSchema.validate(body);

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
		response.setHeader("Set-Cookie", `token=${jwt}; Path=/; HttpOnly`);

		return response.status(200).json({ jwt });
	} catch (e) {
		return response.status(400).json({
			error: "Unknown error",
		});
	}
}

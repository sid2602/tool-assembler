import { registerSchema } from "@/pages/auth/register";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { generateToken } from "./login";

const prisma = new PrismaClient();

async function hashPassword(password: string) {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
}

export default async function POST(
	request: NextApiRequest,
	response: NextApiResponse
) {
	try {
		const { body } = request;
		const isBodyValid = await registerSchema.isValid(body);

		if (isBodyValid === false) {
			return response.json({
				error: "Wrong body",
			});
		}

		const customerData = await registerSchema.validate(body);
		const hashedPassword = await hashPassword(customerData.password);
		const customer = await prisma.customer.create({
			data: { ...customerData, password: hashedPassword },
		});
		const jwt = generateToken(customer);

		response.setHeader("Set-Cookie", `token=${jwt}; Path=/; HttpOnly`);
		return response.status(201).json({ jwt });
	} catch (e) {
		return response.status(400).json({
			error: "Unknown error",
		});
	}
}

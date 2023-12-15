import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

interface VerifiedTokenData {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	iat: number;
	exp: number;
}

const prisma = new PrismaClient();

function verifyToken(token: string): VerifiedTokenData | null {
	const secret = process.env.JWT_SECRET;

	if (secret === undefined) {
		return null;
	}

	try {
		const decoded = jwt.verify(token, secret) as VerifiedTokenData;
		return decoded;
	} catch (error) {
		return null;
	}
}

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse
) {
	try {
		const token = request.cookies.token;

		if (token === undefined) {
			return response.status(400).json({
				error: "No token",
			});
		}

		const decodedToken = verifyToken(token);

		if (decodedToken?.id === undefined) {
			return response.status(400).json({
				error: "Unknown error",
			});
		}

		const customer = await prisma.customer.findUnique({
			where: { id: decodedToken?.id },
		});

		return response.status(200).json({ customer });
	} catch (e) {
		return response.status(400).json({
			error: "Unknown error",
		});
	}
}

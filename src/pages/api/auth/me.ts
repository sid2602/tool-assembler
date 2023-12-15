import { verifyToken } from "@/utils/server/token";
import { Customer, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type MeResponse =
	| { customer: Customer }
	| {
			error: string;
	  };

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse<MeResponse>
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

		if (customer === null) {
			return response.status(400).json({
				error: "Unknown error",
			});
		}

		return response.status(200).json({ customer });
	} catch (e) {
		return response.status(400).json({
			error: "Unknown error",
		});
	}
}

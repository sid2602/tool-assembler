import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { verifyToken } from "@/utils/server/token";
import { Customer, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type MeSuccessResponse = {
	type: "Success";
	customer: Customer;
};

export type MeResponse = MeSuccessResponse | ServerErrorResponse;

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse<MeResponse>
) {
	try {
		const token = request.cookies.token;

		if (token === undefined) {
			return response.status(400).json({
				type: "Error",
				message: "No token",
			});
		}

		const decodedToken = verifyToken(token);

		if (decodedToken?.id === undefined) {
			return response.status(400).json({
				type: "Error",
				message: "Unknown error",
			});
		}

		const customer = await prisma.customer.findUnique({
			where: { id: decodedToken?.id },
		});

		if (customer === null) {
			return response.status(400).json({
				type: "Error",
				message: "Unknown error",
			});
		}

		return response.status(200).json({ type: "Success", customer });
	} catch (e) {
		return response.status(400).json({
			type: "Error",
			message: "Unknown error",
		});
	}
}

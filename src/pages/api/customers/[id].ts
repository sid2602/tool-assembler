import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const customerId = request.query.id;

	if (Array.isArray(customerId) === true || customerId === undefined) {
		return response.json(null);
	}

	const customers = await prisma.customer.findUnique({
		where: { id: Number(customerId) },
	});

	return response.json(customers);
}

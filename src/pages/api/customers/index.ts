import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const customers = await prisma.customer.findMany();
	return response.json(customers);
}

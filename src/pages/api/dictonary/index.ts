import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { Dictonary, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type GetDictonarySuccessResponse = {
	type: "Success";
	item: Dictonary[];
};

export type GetSeachProductResponse =
	| GetDictonarySuccessResponse
	| ServerErrorResponse;

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse<GetSeachProductResponse>
) {
	const { property_names } = request.query;

	if (property_names === undefined) {
		return response.status(400).json({
			type: "Error",
			message: "Wrong property_names ids",
		});
	}

	if (Array.isArray(property_names) === false) {
		return response.status(400).json({
			type: "Error",
			message: "Wrong property_names ids",
		});
	}

	const dictonaries = await prisma.dictonary.findMany({
		where: {
			property_name: { in: property_names },
		},
	});
	return response.json({
		type: "Success",
		item: dictonaries,
	});
}

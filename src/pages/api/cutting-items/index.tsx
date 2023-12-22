import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { Cutting_item, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type GetCuttingItemsSuccessResponse = {
	type: "Success";
	items: Cutting_item[];
};

export type GetCuttingItemsResponse =
	| GetCuttingItemsSuccessResponse
	| ServerErrorResponse;

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse<GetCuttingItemsResponse>
) {
	const { category_id } = request.query;

	const query =
		category_id === undefined
			? undefined
			: { where: { category_id: Number(category_id) } };

	const items = await prisma.cutting_item.findMany(query);
	return response.json({
		type: "Success",
		items: items,
	});
}

import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { Adaptive_item, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type GetAdaptiveItemsSuccessResponse = {
	type: "Success";
	items: Adaptive_item[];
};

export type GetAdaptiveItemsResponse =
	| GetAdaptiveItemsSuccessResponse
	| ServerErrorResponse;

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse<GetAdaptiveItemsResponse>
) {
	const { category_id } = request.query;

	const query =
		category_id === undefined
			? undefined
			: { where: { category_id: Number(category_id) } };

	const items = await prisma.adaptive_item.findMany(query);
	return response.json({
		type: "Success",
		items: items,
	});
}

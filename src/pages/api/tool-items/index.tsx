import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { PrismaClient, Tool_item } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type GetToolItemsSuccessResponse = {
	type: "Success";
	items: Tool_item[];
};

export type GetToolItemsResponse =
	| GetToolItemsSuccessResponse
	| ServerErrorResponse;

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse<GetToolItemsResponse>
) {
	const { category_id } = request.query;

	const query =
		category_id === undefined
			? undefined
			: { where: { category_id: Number(category_id) } };

	const items = await prisma.tool_item.findMany(query);
	return response.json({
		type: "Success",
		items: items,
	});
}

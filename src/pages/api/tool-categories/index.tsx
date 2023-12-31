import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { Adaptive_item_category, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type GetToolItemCategoriesSuccessResponse = {
	type: "Success";
	items: Adaptive_item_category[];
};

export type GetToolItemCategoriesResponse =
	| GetToolItemCategoriesSuccessResponse
	| ServerErrorResponse;

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse<GetToolItemCategoriesResponse>
) {
	const categories = await prisma.tool_item_category.findMany();
	return response.json({
		type: "Success",
		items: categories,
	});
}

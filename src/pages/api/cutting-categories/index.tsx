import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { Cutting_item_category, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type GetCuttingItemCategoriesSuccessResponse = {
	type: "Success";
	items: Cutting_item_category[];
};

export type GetCuttingItemCategoriesResponse =
	| GetCuttingItemCategoriesSuccessResponse
	| ServerErrorResponse;

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse<GetCuttingItemCategoriesResponse>
) {
	const categories = await prisma.cutting_item_category.findMany();
	return response.json({
		type: "Success",
		items: categories,
	});
}

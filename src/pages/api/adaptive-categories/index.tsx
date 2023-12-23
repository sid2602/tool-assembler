import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { Adaptive_item_category, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type GetAdaptiveItemCategoriesSuccessResponse = {
	type: "Success";
	items: Adaptive_item_category[];
};

export type GetAdaptiveItemCategoriesResponse =
	| GetAdaptiveItemCategoriesSuccessResponse
	| ServerErrorResponse;

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse<GetAdaptiveItemCategoriesResponse>
) {
	const categories = await prisma.adaptive_item_category.findMany();
	return response.json({
		type: "Success",
		items: categories,
	});
}

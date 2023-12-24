import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type GetToolCuttingSuccessResponse = {
	type: "Success";
	items: Prisma.Tool_cuttingGetPayload<{
		include: {
			cutting_item: true;
			tool_item: true;
		};
	}>[];
};

export type GetToolCuttingResponse =
	| GetToolCuttingSuccessResponse
	| ServerErrorResponse;

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse<GetToolCuttingResponse>
) {
	const { tool_item_id, cutting_item_id } = request.query;

	if (tool_item_id === undefined && cutting_item_id === undefined) {
		return response.json({
			type: "Error",
			message: "undefined tool_item_id and cutting_item_id",
		});
	}

	const query =
		tool_item_id === undefined
			? cutting_item_id === undefined
				? undefined
				: { where: { cutting_item_id: Number(cutting_item_id) } }
			: { where: { tool_item_id: Number(tool_item_id) } };

	const items = await prisma.tool_cutting.findMany({
		...query,
		include: {
			cutting_item: true,
			tool_item: true,
		},
	});
	return response.json({
		type: "Success",
		items: items,
	});
}

import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type GetToolAdaptiveSuccessResponse = {
	type: "Success";
	items: Prisma.Tool_adaptiveGetPayload<{
		include: {
			adaptive_item: true;
			tool_item: true;
		};
	}>[];
};

export type GetToolAdaptiveResponse =
	| GetToolAdaptiveSuccessResponse
	| ServerErrorResponse;

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse<GetToolAdaptiveResponse>
) {
	const { tool_item_id, adaptive_item_id } = request.query;

	if (tool_item_id === undefined && adaptive_item_id === undefined) {
		return response.json({
			type: "Error",
			message: "undefined tool_item_id and adaptive_item_id",
		});
	}

	const query =
		tool_item_id === undefined
			? adaptive_item_id === undefined
				? undefined
				: { where: { adaptive_item_id: Number(adaptive_item_id) } }
			: { where: { tool_item_id: Number(tool_item_id) } };

	const items = await prisma.tool_adaptive.findMany({
		...query,
		include: {
			adaptive_item: true,
			tool_item: true,
		},
	});
	return response.json({
		type: "Success",
		items: items,
	});
}

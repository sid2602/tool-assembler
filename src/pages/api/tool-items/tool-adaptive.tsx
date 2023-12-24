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
	const { tool_item_id } = request.query;

	const query =
		tool_item_id === undefined
			? undefined
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

import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { PrismaClient, Tool_assembly_adaptive_item } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type PostToolAssemblyAdaptiveItemSuccessResponse = {
	type: "Success";
	item: Tool_assembly_adaptive_item;
};

export type PostToolAssemblyAdaptiveItemResponse =
	| PostToolAssemblyAdaptiveItemSuccessResponse
	| ServerErrorResponse;

export interface PostToolAssemblyAdaptiveItemBody {
	adaptiveItemId: number;
	toolAssemblyId: number;
}

export default async function POST(
	request: NextApiRequest,
	response: NextApiResponse<PostToolAssemblyAdaptiveItemResponse>
) {
	const { adaptiveItemId, toolAssemblyId } =
		request.body as PostToolAssemblyAdaptiveItemBody;

	const tool_assembly_adaptive_item =
		await prisma.tool_assembly_adaptive_item.create({
			data: {
				adaptive_item_id: adaptiveItemId,
				tool_assembly_id: toolAssemblyId,
			},
		});

	return response.json({
		type: "Success",
		item: tool_assembly_adaptive_item,
	});
}
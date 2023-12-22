import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { PrismaClient, Tool_assembly_cutting_item } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type PostToolAssemblyCuttingItemSuccessResponse = {
	type: "Success";
	item: Tool_assembly_cutting_item;
};

export type PostToolAssemblyCuttingItemResponse =
	| PostToolAssemblyCuttingItemSuccessResponse
	| ServerErrorResponse;

export interface PostToolAssemblyCuttingItemBody {
	cuttingItemId: number;
	toolAssemblyId: number;
}

export default async function POST(
	request: NextApiRequest,
	response: NextApiResponse<PostToolAssemblyCuttingItemResponse>
) {
	const { cuttingItemId, toolAssemblyId } =
		request.body as PostToolAssemblyCuttingItemBody;

	const tool_assembly_cutting_item =
		await prisma.tool_assembly_cutting_item.create({
			data: {
				cutting_item_id: cuttingItemId,
				tool_assembly_id: toolAssemblyId,
			},
		});

	return response.json({
		type: "Success",
		item: tool_assembly_cutting_item,
	});
}

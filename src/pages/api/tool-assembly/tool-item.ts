import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { PrismaClient, Tool_assembly_tool_item } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type PostToolAssemblyToolItemSuccessResponse = {
	type: "Success";
	item: Tool_assembly_tool_item;
};

export type PostToolAssemblyToolItemResponse =
	| PostToolAssemblyToolItemSuccessResponse
	| ServerErrorResponse;

export interface PostToolAssemblyToolItemBody {
	toolItemId: number;
	toolAssemblyId: number;
	order: number;
	row: number;
}

export default async function POST(
	request: NextApiRequest,
	response: NextApiResponse<PostToolAssemblyToolItemResponse>
) {
	const { toolItemId, toolAssemblyId, order, row } = request.body
		.data as PostToolAssemblyToolItemBody;

	const tool_assembly_tool_item = await prisma.tool_assembly_tool_item.create({
		data: {
			tool_item_id: toolItemId,
			tool_assembly_id: toolAssemblyId,
			order,
			row,
		},
	});

	return response.json({
		type: "Success",
		item: tool_assembly_tool_item,
	});
}

import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { PrismaClient, Tool_assembly_tool_item } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function routes(
	request: NextApiRequest,
	response: NextApiResponse
) {
	switch (request.method) {
		case "POST":
			return await POST(request, response);
		case "DELETE":
			return await DELETE(request, response);
		default:
			return response.status(400);
	}
}

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
	column: number;
}

async function POST(
	request: NextApiRequest,
	response: NextApiResponse<PostToolAssemblyToolItemResponse>
) {
	const { toolItemId, toolAssemblyId, order, column } = request.body
		.data as PostToolAssemblyToolItemBody;

	const tool_assembly_tool_item = await prisma.tool_assembly_tool_item.create({
		data: {
			tool_item_id: toolItemId,
			tool_assembly_id: toolAssemblyId,
			order,
			column,
		},
	});

	return response.json({
		type: "Success",
		item: tool_assembly_tool_item,
	});
}

export type DeleteToolAssemblyToolItemSuccessResponse = {
	type: "Success";
};

export type DeleteToolAssemblyToolItemResponse =
	| DeleteToolAssemblyToolItemSuccessResponse
	| ServerErrorResponse;

async function DELETE(
	request: NextApiRequest,
	response: NextApiResponse<DeleteToolAssemblyToolItemResponse>
) {
	const { id } = request.query;

	if (Array.isArray(id) === true || id === undefined) {
		return response.status(400).json({
			type: "Error",
			message: "Wrong ID",
		});
	}

	await prisma.tool_assembly_tool_item.delete({
		where: { id: Number(id) },
	});

	return response.json({
		type: "Success",
	});
}

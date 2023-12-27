import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { PrismaClient, Tool_assembly_adaptive_item } from "@prisma/client";
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
	order: number;
	row: number;
}

async function POST(
	request: NextApiRequest,
	response: NextApiResponse<PostToolAssemblyAdaptiveItemResponse>
) {
	const { adaptiveItemId, toolAssemblyId, order, row } = request.body
		.data as PostToolAssemblyAdaptiveItemBody;

	const tool_assembly_adaptive_item =
		await prisma.tool_assembly_adaptive_item.create({
			data: {
				adaptive_item_id: adaptiveItemId,
				tool_assembly_id: toolAssemblyId,
				order,
				row,
			},
		});

	return response.json({
		type: "Success",
		item: tool_assembly_adaptive_item,
	});
}

export type DeleteToolAssemblyAdaptiveItemSuccessResponse = {
	type: "Success";
};

export type DeleteToolAssemblyAdaptiveItemResponse =
	| DeleteToolAssemblyAdaptiveItemSuccessResponse
	| ServerErrorResponse;

async function DELETE(
	request: NextApiRequest,
	response: NextApiResponse<DeleteToolAssemblyAdaptiveItemResponse>
) {
	const { id } = request.query;

	if (Array.isArray(id) === true || id === undefined) {
		return response.status(400).json({
			type: "Error",
			message: "Wrong ID",
		});
	}

	await prisma.tool_assembly_adaptive_item.delete({
		where: { id: Number(id) },
	});

	return response.json({
		type: "Success",
	});
}

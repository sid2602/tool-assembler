import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { PrismaClient, Tool_assembly_cutting_item } from "@prisma/client";
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
	order: number;
	row: number;
}

async function POST(
	request: NextApiRequest,
	response: NextApiResponse<PostToolAssemblyCuttingItemResponse>
) {
	const { cuttingItemId, toolAssemblyId, order, row } = request.body
		.data as PostToolAssemblyCuttingItemBody;

	const tool_assembly_cutting_item =
		await prisma.tool_assembly_cutting_item.create({
			data: {
				cutting_item_id: cuttingItemId,
				tool_assembly_id: toolAssemblyId,
				order,
				row,
			},
		});

	return response.json({
		type: "Success",
		item: tool_assembly_cutting_item,
	});
}

export type DeleteToolAssemblyCuttingItemSuccessResponse = {
	type: "Success";
};

export type DeleteToolAssemblyCuttingItemResponse =
	| DeleteToolAssemblyCuttingItemSuccessResponse
	| ServerErrorResponse;

async function DELETE(
	request: NextApiRequest,
	response: NextApiResponse<DeleteToolAssemblyCuttingItemResponse>
) {
	const { id } = request.query;

	if (Array.isArray(id) === true || id === undefined) {
		return response.status(400).json({
			type: "Error",
			message: "Wrong ID",
		});
	}

	await prisma.tool_assembly_cutting_item.delete({
		where: { id: Number(id) },
	});

	return response.json({
		type: "Success",
	});
}

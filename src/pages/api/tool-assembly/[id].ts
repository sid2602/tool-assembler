import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { PrismaClient, Tool_assembly } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type GetToolAssemblySuccessResponse = {
	type: "Success";
	item: Tool_assembly | null;
};

export type GetToolAssemblyResponse =
	| GetToolAssemblySuccessResponse
	| ServerErrorResponse;

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse<GetToolAssemblyResponse>
) {
	const tool_assembly_id = request.query.id;

	if (
		Array.isArray(tool_assembly_id) === true ||
		tool_assembly_id === undefined
	) {
		return response.json({
			type: "Error",
			message: "Unkown id",
		});
	}

	const tool_assembly = await prisma.tool_assembly.findUnique({
		where: { id: Number(tool_assembly_id) },
		include: {
			used_adaptive_item: true,
			used_assembly_item: true,
			used_cutting_item: true,
			used_tool_item: true,
		},
	});

	return response.json({
		type: "Success",
		item: tool_assembly,
	});
}

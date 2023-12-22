import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { PrismaClient, Tool_assembly } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type PostToolAssemblySuccessResponse = {
	type: "Success";
	item: Tool_assembly;
};

export type PostToolAssemblyResponse =
	| PostToolAssemblySuccessResponse
	| ServerErrorResponse;

export default async function POST(
	request: NextApiRequest,
	response: NextApiResponse<PostToolAssemblyResponse>
) {
	const tool_assembly = await prisma.tool_assembly.create({
		data: {},
	});

	return response.json({
		type: "Success",
		item: tool_assembly,
	});
}

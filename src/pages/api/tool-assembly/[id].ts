import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type Tool_assembly = Prisma.Tool_assemblyGetPayload<{
	include: {
		used_adaptive_item: {
			include: {
				adaptive_item: true;
			};
		};
		used_cutting_item: {
			include: {
				cutting_item: true;
			};
		};
		used_tool_item: {
			include: {
				tool_item: true;
			};
		};
		used_assembly_item: {
			include: {
				assembly_item: true;
			};
		};
	};
}>;

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
			used_adaptive_item: {
				include: {
					adaptive_item: true,
				},
			},
			used_assembly_item: {
				include: {
					assembly_item: true,
				},
			},
			used_cutting_item: {
				include: {
					cutting_item: true,
				},
			},
			used_tool_item: {
				include: {
					tool_item: true,
				},
			},
		},
	});

	return response.json({
		type: "Success",
		item: tool_assembly,
	});
}

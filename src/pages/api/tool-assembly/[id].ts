import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function routes(
	request: NextApiRequest,
	response: NextApiResponse
) {
	switch (request.method) {
		case "GET":
			return await GET(request, response);
		case "PUT":
			return await PUT(request, response);
		default:
			return response.status(400);
	}
}

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
async function GET(
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

export interface PutToolAssemblyBody {
	name: string | null;
	customer_id: number | null;
}

export type PutToolAssemblySuccessResponse = {
	type: "Success";
	item: Tool_assembly | null;
};

export type PutToolAssemblyResponse =
	| PutToolAssemblySuccessResponse
	| ServerErrorResponse;

async function PUT(
	request: NextApiRequest,
	response: NextApiResponse<PutToolAssemblyResponse>
) {
	const tool_assembly_id = request.query.id;
	const { name, customer_id } = request.body.data as PutToolAssemblyBody;
	if (
		Array.isArray(tool_assembly_id) === true ||
		tool_assembly_id === undefined
	) {
		return response.json({
			type: "Error",
			message: "Unkown id",
		});
	}

	const tool_assembly = await prisma.tool_assembly.update({
		where: {
			id: Number(tool_assembly_id),
		},
		data: {
			name,
			customer_id,
		},
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

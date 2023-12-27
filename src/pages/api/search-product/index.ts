import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import {
	Adaptive_item,
	Cutting_item,
	PrismaClient,
	Tool_item,
} from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type GetSearchProductSuccessResponse = {
	type: "Success";
	item: Tool_item | Adaptive_item | Cutting_item;
};

export type GetSeachProductResponse =
	| GetSearchProductSuccessResponse
	| ServerErrorResponse;

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse<GetSeachProductResponse>
) {
	const { name } = request.query;

	if (name === undefined || Array.isArray(name)) {
		return response.status(400).json({
			type: "Error",
			message: "Not id specified",
		});
	}

	const tool_item = await prisma.tool_item.findFirst({
		where: { name: name },
	});
	if (tool_item !== null) {
		return response.json({
			type: "Success",
			item: tool_item,
		});
	}

	const adaptive_item = await prisma.adaptive_item.findFirst({
		where: { name: name },
	});
	if (adaptive_item !== null) {
		return response.json({
			type: "Success",
			item: adaptive_item,
		});
	}

	const cutting_item = await prisma.cutting_item.findFirst({
		where: { name: name },
	});

	if (cutting_item !== null) {
		return response.json({
			type: "Success",
			item: cutting_item,
		});
	}

	return response.status(400).json({
		type: "Error",
		message: "There is no item with this id",
	});
}

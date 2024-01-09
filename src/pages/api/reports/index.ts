import { gropuAssemblies } from "@/components/molecues/navItemAssemblers/navItemAssemblers";
import { mapProductKeys } from "@/pages/product/[name]";
import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { Assembly_item, Dictonary, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type AssemblyItemWithQuantity = {
	assemblyItem: Assembly_item;
	quantity: number;
};

interface DictionaryWithValue extends Dictonary {
	value: string | boolean | number;
}

interface Tools {
	id: number;
	name: string;
	properties: DictionaryWithValue[];
	order: number;
	quantity: number;
}

interface Report {
	adaptive_items: Tools[];
	cutting_items: Tools[];
	tool_items: Tools[];
	assembly_items: AssemblyItemWithQuantity[];
}

export type GetReportSuccessResponse = {
	type: "Success";
	item: Report;
};

export type GetReportsResponse = GetReportSuccessResponse | ServerErrorResponse;

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse<GetReportsResponse>
) {
	const { tool_assembly_id } = request.query;

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
					adaptive_item: {
						include: {
							connecting_assembly_item: {
								include: {
									assembly_item: true,
								},
							},
						},
					},
				},
			},
			used_cutting_item: {
				include: {
					cutting_item: true,
				},
			},
			used_tool_item: {
				include: {
					tool_item: {
						include: {
							connecting_assembly_item: {
								include: {
									assembly_item: true,
								},
							},
						},
					},
				},
			},
		},
	});

	if (tool_assembly === null) {
		return response.json({
			type: "Error",
			message: "There is no ToolAssembly with this id",
		});
	}
	const adaptive_items = [];

	for (let adaptive_item of tool_assembly.used_adaptive_item) {
		const keys = mapProductKeys(adaptive_item.adaptive_item);
		const dictionary = await prisma.dictonary.findMany({
			where: {
				property_name: {
					in: keys,
				},
			},
		});

		const index = adaptive_items.findIndex(
			(item) => item.name === adaptive_item.adaptive_item.name
		);
		if (index > -1) {
			adaptive_items[index].quantity++;
			continue;
		}

		adaptive_items.push({
			id: adaptive_item.adaptive_item.id,
			name: adaptive_item.adaptive_item.name,
			order: adaptive_item.order,
			properties: dictionary.map((item) => ({
				...item,
				value: adaptive_item.adaptive_item[item.property_name],
			})),
			quantity: 1,
		});
	}

	const cutting_items = [];

	for (let cutting_item of tool_assembly.used_cutting_item) {
		const keys = mapProductKeys(cutting_item.cutting_item);
		const dictionary = await prisma.dictonary.findMany({
			where: {
				property_name: {
					in: keys,
				},
			},
		});

		const index = cutting_items.findIndex(
			(item) => item.name === cutting_item.cutting_item.name
		);
		if (index > -1) {
			cutting_items[index].quantity++;
			continue;
		}

		cutting_items.push({
			id: cutting_item.cutting_item.id,
			name: cutting_item.cutting_item.name,
			order: cutting_item.order,
			properties: dictionary.map((item) => ({
				...item,
				value: cutting_item.cutting_item[item.property_name],
			})),
			quantity: 1,
		});
	}

	const tool_items = [];

	for (let tool_item of tool_assembly.used_tool_item) {
		const keys = mapProductKeys(tool_item.tool_item);
		const dictionary = await prisma.dictonary.findMany({
			where: {
				property_name: {
					in: keys,
				},
			},
		});

		const index = tool_items.findIndex(
			(item) => item.name === tool_item.tool_item.name
		);
		if (index > -1) {
			tool_items[index].quantity++;
			continue;
		}

		tool_items.push({
			id: tool_item.tool_item.id,
			name: tool_item.tool_item.name,
			order: tool_item.order,
			properties: dictionary.map((item) => ({
				...item,
				value: tool_item.tool_item[item.property_name],
			})),
			quantity: 1,
		});
	}
	return response.json({
		type: "Success",
		item: {
			adaptive_items: adaptive_items.sort((a, b) => a?.order - b?.order),
			cutting_items: cutting_items.sort((a, b) => a?.order - b?.order),
			tool_items: tool_items.sort((a, b) => a?.order - b?.order),
			assembly_items: gropuAssemblies(tool_assembly),
		},
	});
}

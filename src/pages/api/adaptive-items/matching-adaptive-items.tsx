import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type GetMatchingAdaptiveSuccessResponse = {
	type: "Success";
	items: Prisma.Adaptive_item_matchingGetPayload<{
		include: {
			machine_direction_adaptive_item: true;
			workpiece_direction_adaptive_item: true;
		};
	}>[];
};

export type GetMatchingAdaptiveResponse =
	| GetMatchingAdaptiveSuccessResponse
	| ServerErrorResponse;

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse<GetMatchingAdaptiveResponse>
) {
	const { machine_id, workpiece_id } = request.query;

	if (machine_id === undefined && workpiece_id === undefined) {
		return response.json({
			type: "Error",
			message:
				"undefined machine_direction_adaptive_id and workpiece_direction_adaptive_id",
		});
	}

	const query =
		machine_id === undefined
			? workpiece_id === undefined
				? undefined
				: {
						where: {
							worpiece_direction_adaptive_id: Number(workpiece_id),
						},
				  }
			: {
					where: {
						machine_direction_adaptive_id: Number(machine_id),
					},
			  };

	const items = await prisma.adaptive_item_matching.findMany({
		...query,
		include: {
			machine_direction_adaptive_item: true,
			workpiece_direction_adaptive_item: true,
		},
	});
	return response.json({
		type: "Success",
		items: items,
	});
}

import { EditCustomerSchema } from "@/pages/profile/settings";
import { ServerErrorResponse } from "@/types/ServerErrorResponse";
import { hashPassword } from "@/utils/server/passwordHash";
import { generateToken } from "@/utils/server/token";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

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

export type FullCustomerModel = Prisma.CustomerGetPayload<{
	include: {
		tool_assemblies: true;
	};
}>;

export type GetCustomerSuccessResponse = {
	type: "Success";
	item: FullCustomerModel | null;
};

export type GetCustomerResponse =
	| GetCustomerSuccessResponse
	| ServerErrorResponse;

async function GET(
	request: NextApiRequest,
	response: NextApiResponse<GetCustomerResponse>
) {
	const customerId = request.query.id;

	if (Array.isArray(customerId) === true || customerId === undefined) {
		return response.json({
			type: "Error",
			message: "Wrong customer ID",
		});
	}

	const customer = await prisma.customer.findUnique({
		where: { id: Number(customerId) },
		include: { tool_assemblies: true },
	});

	return response.json({
		type: "Success",
		item: customer,
	});
}

export type EditCustomerSuccessResponse = {
	type: "Success";
	jwt: string;
};

export type EditCustomerResponse =
	| EditCustomerSuccessResponse
	| ServerErrorResponse;

async function PUT(
	request: NextApiRequest,
	response: NextApiResponse<EditCustomerResponse>
) {
	try {
		const { id } = request.query;

		if (Array.isArray(id) === true || id === undefined) {
			return response.status(400).json({
				type: "Error",
				message: "Wrong customer ID",
			});
		}

		const { data } = request.body;
		const isBodyValid = await EditCustomerSchema.isValid(data);
		if (isBodyValid === false) {
			return response.status(400).json({
				type: "Error",
				message: "Wrong body",
			});
		}

		const customerData = await EditCustomerSchema.validate(data);
		const hashedPassword = await hashPassword(customerData.password);

		const customerWithThisSameEmail = await prisma.customer.findFirst({
			where: { email: customerData.email },
		});

		if (
			customerWithThisSameEmail !== null &&
			customerWithThisSameEmail.id !== Number(id)
		) {
			return response.status(400).json({
				type: "Error",
				message: "Customer with this email already exists",
			});
		}

		const customer = await prisma.customer.update({
			data: { ...customerData, password: hashedPassword },
			where: {
				id: Number(id),
			},
		});
		const jwt = generateToken(customer);

		if (jwt === null) {
			return response.status(400).json({
				type: "Error",
				message: "Unknown error",
			});
		}

		response.setHeader("Set-Cookie", `token=${jwt}; Path=/; HttpOnly`);
		return response.status(201).json({ type: "Success", jwt });
	} catch (e) {
		return response.status(400).json({
			type: "Error",
			message: "Unknown error",
		});
	}
}

import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(
	request: NextApiRequest,
	response: NextApiResponse
) {
	response.setHeader(
		"Set-Cookie",
		"token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
	);

	return response.status(200).send({});
}

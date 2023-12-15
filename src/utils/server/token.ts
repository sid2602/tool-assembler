import jwt from "jsonwebtoken";

export function generateToken(payload: any): string | null {
	const secret = process.env.JWT_SECRET;

	if (secret === undefined) {
		return null;
	}

	return jwt.sign(payload, secret, { expiresIn: "1h" });
}

interface VerifiedTokenData {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	iat: number;
	exp: number;
}

export function verifyToken(token: string): VerifiedTokenData | null {
	const secret = process.env.JWT_SECRET;

	if (secret === undefined) {
		return null;
	}

	try {
		const decoded = jwt.verify(token, secret) as VerifiedTokenData;
		return decoded;
	} catch (error) {
		return null;
	}
}

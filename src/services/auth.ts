import { LoginSuccessResponse } from "@/pages/api/auth/login";
import { MeSuccessResponse } from "@/pages/api/auth/me";
import { RegisterSuccessResponse } from "@/pages/api/auth/register";
import axios from "axios";

export interface LoginPost {
	email: string;
	password: string;
}

export interface RegisterPost {
	email: string;
	first_name: string;
	last_name: string;
	password: string;
}

class AuthService {
	async login(data: LoginPost): Promise<LoginSuccessResponse> {
		const resp = await axios.post("http://localhost:3000/api/auth/login", {
			data,
		});

		return resp.data;
	}
	async register(data: RegisterPost): Promise<RegisterSuccessResponse> {
		const resp = await axios.post("http://localhost:3000/api/auth/register", {
			data,
		});

		return resp.data;
	}

	async me(): Promise<MeSuccessResponse> {
		const resp = await axios.get<MeSuccessResponse>(
			"http://localhost:3000/api/auth/me"
		);

		return resp.data;
	}

	async logout(): Promise<void> {
		const resp = await axios.post("http://localhost:3000/api/auth/logout");
		return resp.data;
	}
}

const Auth = new AuthService();
export default Auth;

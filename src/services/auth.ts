import { LoginResponse } from "@/pages/api/auth/login";
import { MeResponse } from "@/pages/api/auth/me";
import { RegisterResponse } from "@/pages/api/auth/register";
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
	async login(data: LoginPost): Promise<LoginResponse> {
		return await axios.post("http://localhost:3000/api/auth/login", {
			data,
		});
	}
	async register(data: RegisterPost): Promise<RegisterResponse> {
		return await axios.post("http://localhost:3000/api/auth/register", {
			data,
		});
	}

	async me(): Promise<MeResponse> {
		return await axios.get("http://localhost:3000/api/auth/me");
	}
}

const Auth = new AuthService();
export default Auth;

import { useMutation, useQueryClient } from "react-query";
import AuthService, { LoginPost, RegisterPost } from "../services/auth";

export const useLogin = () => {
	const queryClient = useQueryClient();
	return useMutation((data: LoginPost) => {
		return AuthService.login(data);
	});
};

export const useRegister = () => {
	const queryClient = useQueryClient();
	return useMutation((data: RegisterPost) => {
		return AuthService.register(data);
	});
};

export const useMe = () => {
	const queryClient = useQueryClient();
	return useMutation(() => {
		return AuthService.me();
	});
};

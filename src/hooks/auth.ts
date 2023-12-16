import Router from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
	return useQuery(["me"], AuthService.me, {
		retry: 2,
		onError: () => {
			Router.replace("/auth/login");
		},
	});
};

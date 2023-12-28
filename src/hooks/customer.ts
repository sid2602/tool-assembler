import { useMutation, useQuery, useQueryClient } from "react-query";
import CustomerService, { UpdateCustomerPut } from "../services/customer.";

export const useGetCustomer = (id: number | undefined) => {
	return useQuery(
		["useGetCustomer", id],
		() => CustomerService.getCustomer(id),
		{ enabled: id !== undefined }
	);
};

interface UseUpdateCustomer {
	id: number;
	data: UpdateCustomerPut;
}

export const useUpdateCustomer = () => {
	const queryClient = useQueryClient();
	return useMutation(
		(data: UseUpdateCustomer) => {
			return CustomerService.updateCustomer(data.id, data.data);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("me");
			},
		}
	);
};

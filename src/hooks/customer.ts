import { useMutation, useQueryClient } from "react-query";
import CustomerService, { UpdateCustomerPut } from "../services/customer.";

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

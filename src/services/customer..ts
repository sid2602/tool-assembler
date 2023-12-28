import {
	EditCustomerSuccessResponse,
	GetCustomerSuccessResponse,
} from "@/pages/api/customers/[id]";
import axios from "axios";

export interface UpdateCustomerPut {
	email: string;
	first_name: string;
	last_name: string;
	password: string;
}

class CustomerService {
	async getCustomer(
		id: number | undefined
	): Promise<GetCustomerSuccessResponse> {
		const resp = await axios.get("http://localhost:3000/api/customers/" + id);

		return resp.data;
	}

	async updateCustomer(
		id: number,
		data: UpdateCustomerPut
	): Promise<EditCustomerSuccessResponse> {
		const resp = await axios.put("http://localhost:3000/api/customers/" + id, {
			data,
		});

		return resp.data;
	}
}

const Customer = new CustomerService();
export default Customer;

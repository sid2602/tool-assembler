import { GetDictonarySuccessResponse } from "@/pages/api/dictonary";
import axios from "axios";

class DictonaryService {
	async getDictonaries(names: string[]): Promise<GetDictonarySuccessResponse> {
		const mapedNames = names.map((name) => "property_names=" + name);
		const resp = await axios.get(
			"http://localhost:3000/api/dictonary?" + mapedNames.join("&")
		);

		return resp.data;
	}
}

const Customer = new DictonaryService();
export default Customer;

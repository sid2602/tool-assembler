import { GetReportSuccessResponse } from "@/pages/api/reports";
import axios from "axios";

class ReportsService {
	async getReport(
		toolAssemblyId: number | undefined
	): Promise<GetReportSuccessResponse> {
		if (toolAssemblyId === undefined) {
			throw new Error();
		}

		const resp = await axios.get(
			"http://localhost:3000/api/reports?tool_assembly_id=" + toolAssemblyId
		);

		return resp.data;
	}
}

const Reports = new ReportsService();
export default Reports;

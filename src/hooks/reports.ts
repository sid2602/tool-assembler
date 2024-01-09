import { useQuery } from "react-query";
import ReportsService from "../services/reports";

export const useGetReport = (id: number | undefined, isEnabled?: boolean) => {
	return useQuery(["useGetReport", id], () => ReportsService.getReport(id), {
		enabled: isEnabled,
	});
};

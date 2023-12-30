import { useQuery } from "react-query";
import DictonaryService from "../services/dictonary";

export const useGetDictonaries = (
	productId: number | undefined,
	names: string[]
) => {
	return useQuery(
		["useGetDictonaries", productId],
		() => DictonaryService.getDictonaries(names),
		{ enabled: productId !== undefined }
	);
};

import { UseQueryResult } from "react-query";

export const checkSomeQueryParam = (
	value: boolean | undefined,
	param: "data" | "isLoading" | "isError",
	...queries: UseQueryResult<any, unknown>[]
) => {
	return queries.some((item) => item[param] === value);
};

import {useSearchParams} from "react-router-dom";

const useQueryParams = () => {
	const [searchParams] = useSearchParams();

	// @ts-ignore
	return Object.fromEntries([...searchParams]);
};

export default useQueryParams;

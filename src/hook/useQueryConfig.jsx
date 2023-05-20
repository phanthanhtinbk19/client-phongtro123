import useQueryParams from "./useQueryParams";
import {isUndefined, omitBy} from "lodash";
const useQueryConfig = () => {
	const queryParams = useQueryParams();

	const queryConfig = omitBy(
		{
			page: queryParams.page,
			order_by: queryParams.order_by,
			priceCode: queryParams.priceCode,
			areaCode: queryParams.areaCode,
			provinceCode: queryParams.provinceCode,
			priceTo: queryParams.priceTo,
			priceFrom: queryParams.priceFrom,
			areaTo: queryParams.areaTo,
			areaFrom: queryParams.areaFrom,
		},
		isUndefined
	);

	return queryConfig;
};
export default useQueryConfig;

import {Link, createSearchParams, useParams} from "react-router-dom";
import useQueryConfig from "../../hook/useQueryConfig";
import icons from "../../constants/icon";
import {useQuery} from "@tanstack/react-query";
import {priceApi} from "../../api";

const {BiChevronRight} = icons;
const ItemPriceSideBar = () => {
	const {category} = useParams();
	const queryConfig = useQueryConfig();
	const {data: pricesData} = useQuery({
		queryKey: ["listPrice"],
		queryFn: () => {
			return priceApi.getPrices();
		},
	});

	const prices = pricesData?.data?.data?.prices;
	return (
		<div className="rounded-lg bg-white border border-slate-300 p-5 mb-5">
			<h2 className="text-lg font-bold">Xem theo giá</h2>
			<div className="grid grid-cols-2 ">
				{prices?.map((item, index) => (
					<div key={index} className="col-span-1  border-b border-slate-100  ">
						<Link
							to={{
								pathname: `/${category}`,
								search: createSearchParams({
									...queryConfig,
									priceCode: item.code,
								}).toString(),
							}}
							className=" flex  items-center gap-2 py-2"
						>
							<BiChevronRight className="text-gray-500" />
							<span
								className={`text-sm hover:text-secondary cursor-pointer ${
									queryConfig?.priceCode === item.code ? "text-secondary" : ""
								}`}
							>
								{item.value}
							</span>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default ItemPriceSideBar;

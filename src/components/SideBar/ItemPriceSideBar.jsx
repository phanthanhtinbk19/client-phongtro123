import {Link, createSearchParams, useParams} from "react-router-dom";
import useQueryConfig from "../../hook/useQueryConfig";
import icons from "../../constants/icon";
import {useApp} from "../../contexts/appContext";

const {BiChevronRight} = icons;
const ItemPriceSideBar = () => {
	const {category} = useParams();
	const queryConfig = useQueryConfig();
	const {prices} = useApp();
	return (
		<div className="rounded-lg bg-white border border-slate-300 p-5 mb-5">
			<h2 className="text-lg font-bold">Xem theo giá</h2>
			<div className="grid grid-cols-2 ">
				{prices?.map((item, index) => (
					<div key={index} className="col-span-1  border-b border-slate-100  ">
						<Link
							to={{
								pathname: `/${category || ""}`,
								search: createSearchParams({
									...queryConfig,
									priceCode: item.code,
								}).toString(),
							}}
							className=" flex  items-center gap-2 py-2"
						>
							<BiChevronRight className="text-gray-500" />
							<span
								className={`text-sm hover:text-secondary hover:font-medium cursor-pointer ${
									queryConfig?.priceCode === item.code
										? "text-secondary font-medium"
										: ""
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

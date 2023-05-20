import {Link, createSearchParams, useParams} from "react-router-dom";
import icons from "../../constants/icon";
import useQueryConfig from "../../hook/useQueryConfig";
import {useQuery} from "@tanstack/react-query";
import {areaApi} from "../../api";
const {BiChevronRight} = icons;
const ItemAreaSideBar = () => {
	const {category} = useParams();
	const queryConfig = useQueryConfig();
	const {data: areasData} = useQuery({
		queryKey: ["listArea"],
		queryFn: () => {
			return areaApi.getAreas();
		},
	});
	const areas = areasData?.data?.data?.areas;
	return (
		<div className="rounded-lg bg-white border border-slate-300 p-5 mb-5">
			<h2 className="text-lg font-bold">Xem theo diện tích</h2>
			<div className="grid grid-cols-2 ">
				{areas?.map((item, index) => (
					<div key={index} className="col-span-1  border-b border-slate-100  ">
						<Link
							to={{
								pathname: `/${category}`,
								search: createSearchParams({
									...queryConfig,
									areaCode: item.code,
								}).toString(),
							}}
							className=" flex  items-center gap-2 py-2"
						>
							<BiChevronRight className="text-gray-500" />
							<span
								className={`text-sm hover:text-secondary cursor-pointer ${
									queryConfig?.areaCode === item.code ? "text-secondary" : ""
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

export default ItemAreaSideBar;

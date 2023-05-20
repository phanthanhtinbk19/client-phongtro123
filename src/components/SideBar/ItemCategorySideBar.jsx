import {Link} from "react-router-dom";
import slugify from "slugify";
import icons from "../../constants/icon";
import {useQuery} from "@tanstack/react-query";
import {categoryApi} from "../../api";
const {BiChevronRight} = icons;
const ItemCategorySideBar = () => {
	const {data: categoriesData} = useQuery({
		queryKey: ["listCategory"],
		queryFn: () => {
			return categoryApi.getCategories();
		},
	});
	const categories = categoriesData?.data?.data?.categories;
	return (
		<div className="rounded-lg bg-white border border-slate-300 p-5 mb-5">
			<h2 className="text-lg font-bold">Danh mục cho thuê</h2>
			<div className="grid grid-cols-1">
				{categories?.map((item, index) => (
					<div key={index} className="col-span-1  border-b border-slate-100  ">
						<Link
							to={slugify(item.value.toLocaleLowerCase(), "-")}
							className=" flex  items-center gap-2 py-2"
							state={{category: item}}
						>
							<BiChevronRight className="text-gray-500" />
							<span className="text-sm hover:text-secondary cursor-pointer">
								{item.value}
							</span>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default ItemCategorySideBar;

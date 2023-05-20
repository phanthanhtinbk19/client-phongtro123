import {useQuery} from "@tanstack/react-query";
import {Link, NavLink, useLocation} from "react-router-dom";
import {categoryApi} from "../../api";
import slugify from "slugify";
import path from "../../constants/path";

const Navigation = () => {
	const navLinkStyle = ({isActive}) => ({
		backgroundColor: isActive ? "#f73859" : "",
	});
	const location = useLocation();

	const category = location.state?.category;

	const {data: categoriesData} = useQuery({
		queryKey: ["listCategory"],
		queryFn: () => {
			return categoryApi.getCategories();
		},
	});
	const categories = categoriesData?.data?.data?.categories;
	return (
		<nav className="w-full bg-primary h-[40px]">
			<ul
				className={`${
					location.pathname.includes(path.SYSTEM) ? "" : "container"
				} mx-auto flex items-center h-full `}
			>
				<li className="inline-block ">
					<NavLink
						to={path.home}
						className=" px-2 hover:bg-secondary bg-primary h-[40px] flex items-center justify-center text-white font-medium text-sm"
						style={navLinkStyle}
					>
						Trang chủ
					</NavLink>
				</li>
				{categories?.map((item, index) => (
					<li key={index} className="">
						<Link
							className={` px-2 hover:bg-secondary  h-[40px] flex items-center justify-center text-white font-medium text-sm ${
								category?.code === item?.code ? "bg-secondary " : "bg-primary"
							}}`}
							to={slugify(item?.value.toLowerCase(), "-")}
						>
							{item.value}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;

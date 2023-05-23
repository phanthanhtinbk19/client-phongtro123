import {NavLink, useLocation} from "react-router-dom";
import slugify from "slugify";
import path from "../../constants/path";
import {useApp} from "../../contexts/appContext";

const navLinkStyle = ({isActive}) => ({
	backgroundColor: isActive ? "#f73859" : "",
});
const Navigation = () => {
	const {categories} = useApp();
	const location = useLocation();
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
						<NavLink
							className=" px-2 hover:bg-secondary bg-primary h-[40px] flex items-center justify-center text-white font-medium text-sm"
							to={slugify(item?.value.toLowerCase(), "-")}
							style={navLinkStyle}
						>
							{item.value}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;

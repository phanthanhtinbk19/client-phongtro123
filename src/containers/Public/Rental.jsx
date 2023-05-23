import {Link, useParams} from "react-router-dom";
import PostList from "../../components/Post/PostList";
import path from "../../constants/path";
import icons from "../../constants/icon";
import {provinceLocation} from "../../utils/common";
import ItemPriceSideBar from "../../components/SideBar/ItemPriceSideBar";
import ItemAreaSideBar from "../../components/SideBar/ItemAreaSideBar";
import ItemNewPostSideBar from "../../components/SideBar/ItemNewPostSideBar";
import {useApp} from "../../contexts/appContext";
import slugify from "slugify";
const {BiChevronRight} = icons;
const Rental = () => {
	const {category} = useParams();
	const {categories} = useApp();

	const categoryItem = categories?.find(
		(item) => slugify(item?.value.toLowerCase(), "-") === category
	);

	return (
		<div className="container mx-auto">
			<div className="flex items-center gap-1 py-2 font-medium">
				<Link className="text-sm text-primary" to={path.home}>
					Trang chủ
				</Link>
				<span>
					<BiChevronRight size={20} className="text-gray-600" />
				</span>
				<Link className="text-sm text-primary" to={path.CHO_THUE_PHONG_TRO}>
					{categoryItem?.value}
				</Link>
			</div>
			<div className="mb-5">
				<h1 className="text-[28px] font-bold">{categoryItem?.header}</h1>
				<p className="text-sm text-gray-600 font-medium">
					{categoryItem?.subheader}
				</p>
			</div>
			<div className="flex items-center gap-5 justify-center mb-5">
				{provinceLocation(categoryItem?.code)?.map((item, index) => (
					<div
						key={index}
						className="w-[190px] h-[150px] bg-white border border-gray-200 rounded-lg shadow text-primary  hover:text-secondary cursor-pointer"
					>
						<div className="w-full h-[110px] flex-shrink-0">
							<img
								className="rounded-t-lg w-full h-full object-cover"
								src={item.image}
								alt=""
							/>
						</div>
						<div className="p-2 text-center">
							<span className="font-bold  text-sm dark:text-gray-400 line-clamp-1">
								{item.name}
							</span>
						</div>
					</div>
				))}
			</div>
			<div className="grid grid-cols-12 gap-5 ">
				<div className="col-span-8 ">
					<PostList categoryCode={categoryItem?.code} />
				</div>
				<div className="col-span-4">
					<ItemPriceSideBar />
					<ItemAreaSideBar />
					<ItemNewPostSideBar />
				</div>
			</div>
		</div>
	);
};

export default Rental;

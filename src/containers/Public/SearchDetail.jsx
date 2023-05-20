import {Link, useLocation} from "react-router-dom";
import PostList from "../../components/Post/PostList";
const {BiChevronRight} = icons;
import icons from "../../constants/icon";
import path from "../../constants/path";
import ItemCategorySideBar from "../../components/SideBar/ItemCategorySideBar";
import ItemPriceSideBar from "../../components/SideBar/ItemPriceSideBar";
import ItemAreaSideBar from "../../components/SideBar/ItemAreaSideBar";
import ItemNewPostSideBar from "../../components/SideBar/ItemNewPostSideBar";
import slugify from "slugify";

const SearchDetail = () => {
	const location = useLocation();
	console.log(location);

	return (
		<div className="container mx-auto">
			<div className="flex items-center gap-1 py-2 font-medium">
				<Link className="text-sm text-primary" to={path.home}>
					Trang chủ
				</Link>
				<span>
					<BiChevronRight size={20} className="text-gray-600" />
				</span>
				<Link
					className="text-sm text-primary"
					to={`/${slugify(
						location?.state?.category?.name.toLowerCase() || ""
					)}`}
				>
					{location?.state?.category?.name}
				</Link>

				<span>
					<BiChevronRight size={20} className="text-gray-600" />
				</span>

				<div className="flex items-center text-gray-500 text-sm">
					{location?.state?.price && (
						<span>
							Giá từ {location?.state?.price?.priceNumber[0]} -
							{location?.state?.price?.priceNumber[1]} triệu đồng
						</span>
					)}
					{location?.state?.price && location?.state?.area && (
						<span className="pr-1">,</span>
					)}
					{location?.state?.area && (
						<span>
							Diện tích từ {location?.state?.area?.areaNumber[0]}m2 -
							{location?.state?.area?.areaNumber[1]}m2
						</span>
					)}
				</div>
			</div>
			<div className="mb-5">
				<div className="text-[28px] font-bold flex items-center gap-2">
					<span>{location?.state?.category?.name}</span>
					<span>
						Giá từ {location?.state?.price?.priceNumber[0]} -
						{location?.state?.price?.priceNumber[1]} triệu đồng
					</span>
					{location?.state?.price && location?.state?.area && (
						<span className="pr-1">,</span>
					)}
					{location?.state?.area && (
						<span>
							Diện tích từ {location?.state?.area?.areaNumber[0]}m2 -
							{location?.state?.area?.areaNumber[1]}m2
						</span>
					)}
				</div>
				<p className="text-sm text-gray-700">
					Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê
					phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+
					tin đăng và 2.500.000 lượt xem mỗi tháng.
				</p>
			</div>
			<div className="flex items-center gap-5 justify-center mb-5"></div>
			<div className="grid grid-cols-12 gap-5 ">
				<div className="col-span-8 ">
					<PostList
						categoryCode={location?.state?.category?.categoryCode || " "}
					/>
				</div>
				<div className="col-span-4">
					<ItemCategorySideBar />
					<ItemPriceSideBar />
					<ItemAreaSideBar />
					<ItemNewPostSideBar />
				</div>
			</div>
		</div>
	);
};

export default SearchDetail;

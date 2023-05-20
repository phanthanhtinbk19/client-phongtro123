import {Link, useLocation} from "react-router-dom";
import PostList from "../../components/Post/PostList";
const {BiChevronRight} = icons;
import icons from "../../constants/icon";
import path from "../../constants/path";
import useQueryParams from "../../hook/useQueryParams";
import {useQuery} from "@tanstack/react-query";
import {provinceApi} from "../../api";
import {useEffect, useState} from "react";
import ItemCategorySideBar from "../../components/SideBar/ItemCategorySideBar";
import ItemPriceSideBar from "../../components/SideBar/ItemPriceSideBar";
import ItemAreaSideBar from "../../components/SideBar/ItemAreaSideBar";
import ItemNewPostSideBar from "../../components/SideBar/ItemNewPostSideBar";

const SearchDetail = () => {
	const [proviceCurrent, setProviceCurrent] = useState({
		value: "",
		code: "",
	});
	const {provinceCode, priceTo, priceFrom, areaTo, areaFrom} = useQueryParams();
	const {data: provincesData} = useQuery({
		queryKey: ["listProvince"],
		queryFn: () => {
			return provinceApi.getProvinces();
		},
	});
	const provinces = provincesData?.data?.data?.provinces;
	useEffect(() => {
		if (provinces && provinceCode) {
			const provinceCurrent = provinces.find(
				(item) => item.code === provinceCode
			);
			setProviceCurrent(provinceCurrent);
		}
	}, [provinces, provinceCode]);
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
				<Link className="text-sm text-primary" to={path.CHO_THUE_PHONG_TRO}>
					{proviceCurrent?.value}
				</Link>
				{(priceTo || areaTo) && (
					<span>
						<BiChevronRight size={20} className="text-gray-600" />
					</span>
				)}
				<div className="flex items-center text-gray-500 text-sm">
					{priceTo && (
						<span>
							Giá từ {priceTo} - {priceFrom} triệu đồng
						</span>
					)}
					{priceTo && areaTo && <span className="pr-1">,</span>}
					{areaTo && (
						<span>
							Diện tích từ {areaTo}m2 đến {areaFrom}m2
						</span>
					)}
				</div>
			</div>
			<div className="mb-5">
				<h1 className="text-[28px] font-bold">
					Kênh thông tin Phòng Trọ số 1 Việt Nam
				</h1>
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

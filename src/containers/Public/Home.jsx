import {CardProvince} from "../../components";
import PostList from "../../components/Post/PostList";
import ItemAreaSideBar from "../../components/SideBar/ItemAreaSideBar";
import ItemCategorySideBar from "../../components/SideBar/ItemCategorySideBar";
import ItemNewPostSideBar from "../../components/SideBar/ItemNewPostSideBar";
import ItemPriceSideBar from "../../components/SideBar/ItemPriceSideBar";

const Home = () => {
	return (
		<div className="container mx-auto ">
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
			<CardProvince />
			<div className="grid grid-cols-12 gap-5 ">
				<div className="col-span-8 ">
					<PostList categoryCode={""} />
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

export default Home;

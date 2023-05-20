import {AiFillStar} from "react-icons/ai";
import {Link} from "react-router-dom";
import path from "../../constants/path";

const Footer = () => {
	return (
		<div className="container mx-auto">
			<div className="shadow rounded-md pt-5 px-12 pb-12 mt-20">
				<div className="flex flex-col justify-center items-center gap-2">
					<h4 className="text-center text-lg font-bold">
						Tại sao lại chọn PhongTro123.com?
					</h4>
					<p className="text-center">
						Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự
						hào là trang web đứng top google về các từ khóa:{" "}
						<Link
							className="text-primary font-bold"
							to={path.CHO_THUE_PHONG_TRO}
						>
							cho thuê phòng trọ
						</Link>
						,{" "}
						<Link className="text-primary font-bold" to={path.CHO_THUE_NHA}>
							nhà trọ
						</Link>
						,{" "}
						<Link className="text-primary font-bold" to={path.CHO_THUE_CAN_HO}>
							cho thuê căn hộ
						</Link>
						,{" "}
						<Link
							className="text-primary font-bold"
							to={path.CHO_THUE_MAT_BANG}
						>
							{" "}
							cho thuê mặt bằng
						</Link>
						...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều
						khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn
					</p>
					<div className="grid grid-cols-4 gap-2 items-center justify-between w-full">
						<div className="flex flex-col gap-1 items-center justify-center">
							<span className="text-xl font-bold">116.998+</span>
							<span className="text-gray-600">Thành viên</span>
						</div>
						<div className="flex flex-col gap-1 items-center justify-center">
							<span className="text-xl font-bold">103.348+</span>
							<span className="text-gray-600">Tin đăng</span>
						</div>
						<div className="flex flex-col gap-1 items-center justify-center">
							<span className="text-xl font-bold">300.000+</span>
							<span className="text-gray-600">Lượt truy cập/tháng</span>
						</div>
						<div className="flex flex-col gap-1 items-center justify-center">
							<span className="text-xl font-bold"> 2.500.000+</span>
							<span className="text-gray-600">Lượt xem/tháng</span>
						</div>
					</div>
					<h4 className="text-center text-lg font-bold py-2">
						Chi phí thấp, hiệu quả tối đa
					</h4>
					<div className="flex items-center gap-1 text-yellow-400">
						<AiFillStar size={20} />
						<AiFillStar size={20} />
						<AiFillStar size={20} />
						<AiFillStar size={20} />
						<AiFillStar size={20} />
					</div>
					<p className="text-center text-sm italic">
						Trước khi biết website phongtro123, mình phải tốn nhiều công sức và
						chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy,
						và đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết
						website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu
						quả khá cao trong khi chi phí khá thấp, không còn tình trạng phòng
						trống kéo dài.
					</p>
					<h4 className="text-center text-lg font-bold py-2">
						Bạn đang có phòng trọ / căn hộ cho thuê?
					</h4>
					<p>Không phải lo tìm người cho thuê, phòng trống kéo dài</p>
					<button className="bg-secondary px-4 py-2 rounded-md text-white font-medium mt-2">
						Đăng tin ngay
					</button>
				</div>
			</div>
		</div>
	);
};

export default Footer;

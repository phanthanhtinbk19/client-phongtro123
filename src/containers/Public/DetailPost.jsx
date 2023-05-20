import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Pagination, Navigation} from "swiper";
import {postApi} from "../../api";
import {useQuery} from "@tanstack/react-query";
import {Link, useParams} from "react-router-dom";
import icons from "../../constants/icon";
import ItemNewPostSideBar from "../../components/SideBar/ItemNewPostSideBar";

const {
	AiFillStar,
	CiLocationOn,
	IoCropSharp,
	BiHash,
	AiOutlineClockCircle,
	IoPricetagOutline,
	BsFillTelephoneFill,
	AiOutlineHeart,
} = icons;
const DetailPost = () => {
	const {id: postId} = useParams();
	const {data: postData} = useQuery({
		queryKey: ["singlePost", postId],
		queryFn: () => {
			return postApi.getSinglePost(postId);
		},
	});
	const singlePost = postData?.data?.data?.post;

	return (
		<div className="container mx-auto">
			<div className="grid grid-cols-12 gap-5">
				<div className="col-span-8">
					<div className="h-[317px] w-full bg-black">
						<Swiper
							pagination={{
								type: "fraction",
							}}
							navigation={true}
							modules={[Pagination, Navigation]}
							className="mySwiper h-full w-full"
						>
							{singlePost &&
								JSON.parse(singlePost?.images?.image)?.map((item, index) => (
									<SwiperSlide key={index}>
										<img
											src={item}
											alt=""
											className="w-full h-full object-contain"
										/>
									</SwiperSlide>
								))}
						</Swiper>
					</div>
					<div className="border border-slate-300 shadow rounded-b-md p-4 bg-white">
						<div className="pb-5">
							<Link
								to={`/posts/${singlePost?.id}`}
								className=" text-2xl  font-bold text-secondary mb-4 block"
							>
								<span className="inline-flex pr-1 text-yellow-400">
									<AiFillStar size={20} />
									<AiFillStar size={20} />
									<AiFillStar size={20} />
									<AiFillStar size={20} />
									<AiFillStar size={20} />
								</span>
								{singlePost?.title}
							</Link>
							<div className="text-sm pb-2">
								<span> Chuyên mục</span>:{" "}
								<Link to="" className="text-primary underline">
									<strong className="text-sm">
										{singlePost?.labels?.value}
									</strong>
								</Link>
							</div>
							<div className="flex gap-2 items-center pb-2">
								<CiLocationOn className="text-primary" size={20} />
								<p className="text-sm">{singlePost?.address}</p>
							</div>
							<div className="flex items-center gap-10">
								<div className="flex items-center gap-2">
									<IoPricetagOutline className="text-gray-400" size={20} />
									<span className="text-green text-xl font-bold">
										{singlePost?.attributes?.price}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<IoCropSharp className="text-gray-400" size={20} />
									<span className="text-sm ">
										{singlePost?.attributes?.acreage}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<AiOutlineClockCircle className="text-gray-400" size={20} />
									<span className="text-sm">
										{singlePost?.attributes?.published}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<BiHash className="text-gray-400" size={20} />
									<span className="text-sm">
										{singlePost?.attributes?.hashtag}
									</span>
								</div>
							</div>
						</div>
						<section className="mb-5">
							<div>
								<h2 className="text-lg font-bold">Thông tin mô tả</h2>
							</div>
							<div>
								{singlePost &&
									JSON.parse(singlePost?.description).map((item, index) => (
										<p key={index} className="py-1">
											{item}
										</p>
									))}
							</div>
						</section>
						<section className="mb-5">
							<div>
								<h2 className="text-lg font-bold pb-4">Đặc điểm tin đăng</h2>
							</div>
							<div className="relative w-full">
								<div className="w-full">
									<div className="block bg-white px-6 py-3">
										<div className="flex items-center">
											<div className="w-[200px]">Mã tin:</div>
											<div className="flex-1">
												{singlePost?.attributes?.hashtag}
											</div>
										</div>
									</div>
									<div className="block bg-gray-100 px-6 py-3">
										<div className="flex items-center">
											<div className="w-[200px]">Khu vực</div>
											<div className="flex-1">
												{`${singlePost?.category?.value} ${singlePost?.province?.value}`}
											</div>
										</div>
									</div>
									<div className="block bg-white px-6 py-3">
										<div className="flex items-center">
											<div className="w-[200px]">Loại tin rao:</div>
											<div className="flex-1">
												{singlePost?.overviews?.type}
											</div>
										</div>
									</div>
									<div className="block bg-gray-100 px-6 py-3">
										<div className="flex items-center">
											<div className="w-[200px]">Đối tượng thuê:</div>
											<div className="flex-1">
												{singlePost?.overviews?.target}
											</div>
										</div>
									</div>
									<div className="block bg-white px-6 py-3">
										<div className="flex items-center">
											<div className="w-[200px]">Gói tin:</div>
											<div className="flex-1">
												{singlePost?.overviews?.bonus}
											</div>
										</div>
									</div>
									<div className="block bg-gray-100 px-6 py-3">
										<div className="flex items-center">
											<div className="w-[200px]">Ngày đăng:</div>
											<div className="flex-1">
												{singlePost?.attributes?.published}
											</div>
										</div>
									</div>
									<div className="block bg-white px-6 py-3">
										<div className="flex items-center">
											<div className="w-[200px]">Ngày hết hạn:</div>
											<div className="flex-1">qqqqqqqqqqq</div>
										</div>
									</div>
								</div>
							</div>
						</section>
						<section className="mb-5">
							<div>
								<h2 className="text-lg font-bold pb-4">Thông tin liên hệ</h2>
							</div>
							<div className="relative w-full">
								<div className="w-full">
									<div className="block bg-white px-6 py-3">
										<div className="flex items-center">
											<div className="w-[200px]">Liên hệ:</div>
											<div className="flex-1">{singlePost?.user?.name}</div>
										</div>
									</div>
									<div className="block bg-gray-100 px-6 py-3">
										<div className="flex items-center">
											<div className="w-[200px]">Điện thoại:</div>
											<div className="flex-1">{singlePost?.user?.phone}</div>
										</div>
									</div>
									<div className="block bg-white px-6 py-3">
										<div className="flex items-center">
											<div className="w-[200px]">Zalo:</div>
											<div className="flex-1">
												{singlePost?.user?.zalo
													? singlePost?.user?.zalo
													: "Không có"}
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
				<div className="col-span-4">
					<div className="bg-orange rounded-md p-5 w-full flex justify-center flex-col items-center gap-2">
						<div className="w-[80px] h-[80px]">
							<img
								src="https://phongtro123.com/images/default-user.png"
								className="w-full h-full object-cover rounded-full"
								alt=""
							/>
						</div>
						<h2 className="text-xl font-bold">{singlePost?.user?.name}</h2>
						<div className="flex items-center gap-1">
							<span className="inline-block w-2 h-2 rounded-full bg-green"></span>
							<span className="text-sm">Đang hoạt động</span>
						</div>
						<Link
							to="tel:+0868827535"
							className="bg-green p-2 w-full flex items-center justify-center gap-2 text-xl font-bold text-white rounded-md"
						>
							<BsFillTelephoneFill />
							<span>{singlePost?.user?.phone}</span>
						</Link>
						<Link
							to="tel:+0868827535"
							className="bg-white border border-slate-700 p-2 w-full flex items-center justify-center gap-2  font-bold  rounded-md"
						>
							<div className="w-8 h-8 flex flex-shrink-0">
								<img
									src="https://phongtro123.com/images/icon-zalo.png"
									className="w-full h-full rounded-full object-cover"
									alt=""
								/>
							</div>
							<span> Nhắn Zalo</span>
						</Link>
						<div className="bg-white border border-slate-700 p-2 w-full flex items-center justify-center gap-2  font-bold rounded-md">
							<AiOutlineHeart />
							<span>Yêu thích</span>
						</div>
					</div>
					<ItemNewPostSideBar />
				</div>
			</div>
		</div>
	);
};

export default DetailPost;

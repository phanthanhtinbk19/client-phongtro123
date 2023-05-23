import {Link} from "react-router-dom";
import icons from "../../constants/icon";
import {extractLocation, isValidJSON} from "../../utils/common";
import {useState} from "react";
import moment from "moment";
const {AiFillStar, AiOutlineHeart, AiFillHeart} = icons;

const PostItem = ({post}) => {
	const [like, setLike] = useState(false);

	return (
		<div className="bg-[#fff9f3] p-5 border-t border-red-500">
			<div className="grid grid-cols-12 gap-5 items-start">
				<Link
					to={`/posts/${post?.id}`}
					className="col-span-5 w-full h-[240px] cursor-pointer relative"
				>
					<img
						src={JSON.parse(post?.images?.image)[0]}
						alt=""
						className="w-full h-full object-cover rounded-lg"
					/>
					<div className="absolute bottom-2  w-full">
						<div className="flex justify-between items-center relative px-2">
							<span className="text-sm font-medium text-white inline-block px-2 py-1 bg-black/50 rounded-md ">
								12 ảnh
							</span>
							<span
								className="text-sm font-medium text-white inline-block px-2 py-1 bg-black/50 rounded-md "
								onClick={() => setLike(!like)}
							>
								{like ? (
									<AiFillHeart size={20} className="text-[#f73859]" />
								) : (
									<AiOutlineHeart size={20} />
								)}
							</span>
						</div>
					</div>
				</Link>
				<div className="col-span-7">
					<div>
						<Link
							to={`/posts/${post?.id}`}
							className="line-clamp-2 text-lg font-bold text-secondary"
						>
							<span className="inline-flex pr-1 text-yellow-400">
								{new Array(+post?.star).fill(0).map((item, index) => {
									return <AiFillStar key={index} size={15} />;
								})}
							</span>
							{post?.title}
						</Link>
						<div className="flex flex-wrap gap-2 justify-between items-center my-2">
							<span className="text-lg font-bold text-green">
								{post?.attributes?.price}
							</span>
							<span className="text-gray-600">{post?.attributes?.acreage}</span>
							<span className="text-gray-600">
								<a
									href="https://phongtro123.com/tinh-thanh/ho-chi-minh/quan-tan-phu"
									className="text-sm text-gray-600"
								>
									{extractLocation(post.address)}
								</a>
							</span>
							<span className="text-sm text-gray-500">
								{moment(post?.createdAt).fromNow()}
							</span>
						</div>
						{post?.description && isValidJSON(post.description) ? (
							<p className="line-clamp-3 font-medium text-sm text-gray-500">
								{JSON.parse(post.description)}
							</p>
						) : (
							<p
								dangerouslySetInnerHTML={{__html: post?.description}}
								className="line-clamp-3 font-medium text-sm text-gray-500"
							></p>
						)}

						<div className="flex justify-between mt-4">
							<div className="flex items-center gap-2 flex-1">
								<img
									src="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2023/05/10/222_1683696992.jpg"
									className="w-8 h-8 object-cover"
								/>
								<span className="capitalize text-gray-500 text-sm">
									{post?.user?.name}
								</span>
							</div>
							<div className="  flex flex-col gap-3">
								<a
									rel="nofollow noreferrer"
									target="_blank"
									href="https://zalo.me/0938864405"
									className="px-2 py-1 text-sm border border-primary text-primary rounded-lg hover:bg-primary hover:text-white text-center inline-block  "
								>
									Nhắn Zalo
								</a>
								<a
									rel="nofollow noreferrer"
									target="_blank"
									href="tel:0938864405"
									className="px-2 py-1 border text-sm border-primary  rounded-lg bg-primary text-white"
								>
									Gọi {post?.user?.phone}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostItem;

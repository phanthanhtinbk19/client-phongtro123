import moment from "moment/moment";
import {Link} from "react-router-dom";
import {useApp} from "../../contexts/appContext";

const ItemNewPostSideBar = () => {
	const {newPosts} = useApp();
	return (
		<div className="rounded-lg bg-white border border-slate-300 p-5 my-5">
			<h2 className="text-lg font-bold">Tin mới đăng</h2>
			<div className="mt-2">
				{newPosts &&
					newPosts.map((item, index) => (
						<Link
							to={`/posts/${item?.id}`}
							key={index}
							className={`flex gap-2 py-2 ${
								index == 4 ? "" : "border-b border-slate-100"
							}`}
						>
							<div className="w-[65px] h-[65px] flex flex-shrink-0">
								<img
									src={JSON.parse(item?.images?.image)[0]}
									alt=""
									className="w-full h-full object-cover rounded-sm"
								/>
							</div>
							<div className="flex flex-col justify-between">
								<p className="line-clamp-2 text-sm font-medium text-[#055699]">
									{item?.title}
								</p>
								<div className="flex justify-between items-center">
									<span className="text-green-400 font-bold text-sm">
										{item?.attributes?.price}
									</span>
									<time
										className="text-sm text-gray-500 font-medium"
										title="Thứ 6, 19:19 12/05/2023"
									>
										{moment(item?.createdAt).fromNow()}
									</time>
								</div>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};

export default ItemNewPostSideBar;

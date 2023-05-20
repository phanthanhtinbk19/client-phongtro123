import {Link, createSearchParams} from "react-router-dom";
import {orderBy} from "../../constants/post";

const SortPostList = ({queryConfig}) => {
	const {order_by = orderBy.default} = queryConfig;
	const isActiveOrderBy = (orderByValue) => {
		return order_by === orderByValue;
	};
	return (
		<div className="flex items-center gap-2">
			<span className="text-sm text-gray-700">Sắp xếp: </span>
			<Link
				className={`text-sm bg-gray-100 py-2 px-4 rounded-md ${
					isActiveOrderBy("default") ? "underline" : ""
				}`}
				to={{
					pathname: "/",
					search: createSearchParams({
						...queryConfig,
						order_by: orderBy.default,
					}).toString(),
				}}
			>
				Mặc định
			</Link>
			<Link
				className={`text-sm bg-gray-100 py-2 px-4 rounded-md ${
					isActiveOrderBy("newest") ? "underline" : ""
				}`}
				to={{
					pathname: "/",
					search: createSearchParams({
						...queryConfig,
						order_by: orderBy.newest,
					}).toString(),
				}}
			>
				Mới nhất
			</Link>
			<Link
				className={`text-sm bg-gray-100 py-2 px-4 rounded-md ${
					isActiveOrderBy("video") ? "underline" : ""
				}`}
				to={{
					pathname: "/",
					search: createSearchParams({
						...queryConfig,
						order_by: orderBy.video,
					}).toString(),
				}}
			>
				Có video
			</Link>
		</div>
	);
};

export default SortPostList;

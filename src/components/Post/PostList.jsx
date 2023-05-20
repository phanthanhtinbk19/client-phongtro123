import PostItem from "./PostItem";
import {useQuery} from "@tanstack/react-query";
import {postApi} from "../../api";
import Pagination from "../Pagination/Pagination";
import useQueryConfig from "../../hook/useQueryConfig";
import SortPostList from "./SortPostList";
const PostList = ({categoryCode}) => {
	const queryConfig = useQueryConfig();

	const {data: postsData} = useQuery({
		queryKey: ["postList", {categoryCode, ...queryConfig}],
		queryFn: () => {
			return postApi.getPosts({categoryCode, ...queryConfig});
		},
		keepPreviousData: true,
	});

	return (
		<div className="w-full">
			<div className=" border border-gray-300 rounded-lg">
				<div className="bg-white shadow pt-5 px-5 pb-2 rounded-t-lg ">
					<h2 className="text-lg font-bold pb-2">Danh sách tin đăng</h2>
					<SortPostList queryConfig={queryConfig} />
				</div>
				<div>
					{postsData?.data?.data?.posts?.slice(0, 10).map((post) => (
						<PostItem key={post.id} post={post} />
					))}
				</div>
			</div>
			<div className="mt-5">
				<Pagination
					totalPage={postsData?.data?.data?.pagination.page_size}
					queryConfig={queryConfig}
				/>
			</div>
		</div>
	);
};

export default PostList;

import {Fragment, useState} from "react";
import {Button} from "../../components";
import path from "../../constants/path";

import icons from "../../constants/icon";
import {useQuery} from "@tanstack/react-query";
import {postApi} from "../../api";
import moment from "moment";
import UpdatePost from "./UpdatePost";
import ModalLayout from "../../layouts/ModalLayout";
import ModalDelete from "../../components/Modal/ModalDelete";
import useToggle from "../../hook/useToggle";
const {BiEdit, FaTrash} = icons;
const ManagePost = () => {
	const {toggle: showModalDelete, setToggle: setShowModalDelete} = useToggle();
	const {toggle: showModalUpdate, setToggle: setShowModalUpdate} = useToggle();
	const [postId, setPostId] = useState("");

	const {data: postsData} = useQuery({
		queryKey: ["privatePostList"],
		queryFn: () => {
			return postApi.getPrivatePosts();
		},
	});
	const posts = postsData?.data?.data?.posts;

	const checkedStatus = (dateString) => {
		const momentDate = moment(new Date(), "HH:mm DD/MM/YYYY");
		const mommentDate2 = moment(
			dateString.split(",")[1].trim(),
			"HH:mm DD/MM/YYYY"
		);
		return moment(momentDate).isSameOrAfter(mommentDate2);
	};

	return (
		<>
			<div>
				<div className="flex justify-between items-center my-4">
					<h2 className="text-2xl font-medium">Quản lý tin đăng</h2>
					<div className="flex items-center gap-5 justify-center">
						<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
							<option value=" " disabled>
								Lọc theo trạng thái
							</option>
							<option value="US">Tin đang hiển thị</option>
							<option value="CA">Tin hết hạn</option>
						</select>

						<Button
							to={path.CREATE_POST}
							BeforeIcon={Fragment}
							type="button"
							AfterIcon={Fragment}
							className="text-white bg-secondary min-w-[100px] text-sm p-2"
						>
							<span> Đăng tin mới </span>
						</Button>
					</div>
				</div>
				<div>
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
							<thead className="text-sm text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
								<tr>
									<th scope="col" className="px-4 py-3 column ">
										Mã tin
									</th>
									<th scope="col" className="px-4 py-3 column">
										Ảnh đại diện
									</th>
									<th scope="col" className="px-4 py-3 column">
										Tiêu đề
									</th>
									<th scope="col" className="px-4 py-3 column">
										Giá
									</th>
									<th scope="col" className="px-4 py-3 column">
										Ngày bắt đầu
									</th>
									<th scope="col" className="px-4 py-3 column">
										Ngày hết hạn
									</th>
									<th scope="col" className="px-4 py-3 column">
										Trạng thái
									</th>
									<th scope="col" className="px-4 py-3 column">
										Thao tác
									</th>
								</tr>
							</thead>
							<tbody>
								{posts?.length > 0 &&
									posts?.map((post, index) => (
										<tr
											key={index}
											className="bg-white border-b backdrop:hover:bg-gray-50 "
										>
											<th
												scope="row"
												className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
											>
												{`#${post?.attributes?.hashtag}`}
											</th>
											<td className="px-4 py-4">
												<img
													src={JSON.parse(post?.images?.image)[0]}
													alt=""
													className="w-10 h-10 object-cover rounded-sm"
												/>
											</td>
											<td className="px-4 py-4 ">
												<span className="line-clamp-1">{post?.title}</span>
											</td>
											<td className="px-4 py-4">{post?.attributes?.price}</td>
											<td className="px-4 py-4">{post?.overviews?.created}</td>
											<td className="px-4 py-4">{post?.overviews?.expired}</td>
											<td className="px-4 py-4">
												{checkedStatus(post?.overviews?.expired)
													? "Hết hạn"
													: "Đang hiển thị"}
											</td>
											<td className="px-4 py-4 text-right">
												<div className="flex items-center gap-4">
													<button
														onClick={() => {
															setShowModalUpdate(true);
															setPostId(post?.id);
														}}
														className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
													>
														<BiEdit size={20} />
													</button>
													<button
														onClick={() => {
															setShowModalDelete(true);
															setPostId(post?.id);
														}}
														className="font-medium text-red-600  hover:underline"
													>
														<FaTrash size={20} />
													</button>
												</div>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			{showModalUpdate && (
				<UpdatePost postId={postId} onClose={() => setShowModalUpdate(false)} />
			)}
			{showModalDelete && (
				<ModalLayout onClose={() => {}}>
					<ModalDelete
						onClose={() => setShowModalDelete(false)}
						postId={postId}
					/>
				</ModalLayout>
			)}
		</>
	);
};

export default ManagePost;

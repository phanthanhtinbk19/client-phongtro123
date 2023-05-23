import {Fragment, useEffect, useRef, useState} from "react";
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
import menuStatus from "../../utils/menuStatus";
import {Link, createSearchParams} from "react-router-dom";
import useQueryConfig from "../../hook/useQueryConfig";
const {BiEdit, FaTrash, FaCaretDown} = icons;
const ManagePost = () => {
	const ref = useRef();
	const queryConfig = useQueryConfig();
	const {toggle: showModalDelete, setToggle: setShowModalDelete} = useToggle();
	const {toggle: showModalUpdate, setToggle: setShowModalUpdate} = useToggle();
	const {toggle: showMenu, setToggle: setShowMenu} = useToggle();

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
	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			// @ts-ignore
			if (ref.current && !ref.current.contains(e.target)) {
				setShowMenu(false);
			}
		};
		document.addEventListener("click", checkIfClickedOutside);
		return () => {
			document.removeEventListener("click", checkIfClickedOutside);
		};
	}, [setShowMenu, showMenu]);
	return (
		<>
			<div>
				<div className="flex justify-between items-center my-4">
					<h2 className="text-2xl font-medium">Quản lý tin đăng</h2>
					<div className="flex items-center gap-5 justify-center">
						<div className="relative" ref={ref}>
							<Button
								BeforeIcon={Fragment}
								className="bg-gray-50 rounded-md border text-gray-600"
								type="button"
								AfterIcon={FaCaretDown}
								onClick={() => setShowMenu(!showMenu)}
							>
								<span> Lọc theo trạng thái </span>
							</Button>
							{showMenu && (
								<ul className="w-full rounded-md shadow-md  absolute top-12 bg-white z-10 left-0 border">
									{menuStatus?.map((item, index) => (
										<li key={index} className="hover:bg-gray-100 w-full">
											<Link
												className="py-2 px-5 inline-block  "
												to={{
													pathname: location.pathname,
													search: createSearchParams({
														...queryConfig,
														status: item.value,
													}).toString(),
												}}
												title="Đăng tin cho thuê"
												onClick={() => setShowMenu(false)}
											>
												<span>{item.title}</span>
											</Link>
										</li>
									))}
								</ul>
							)}
						</div>
						<Button
							to={`/${path.SYSTEM}/${path.CREATE_POST}`}
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

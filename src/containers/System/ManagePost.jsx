import {useForm} from "react-hook-form";
import InputReadOnly from "../../components/MyInput/InputReadOnly";

import {Button, MyInput} from "../../components";
import {Link} from "react-router-dom";
import {anonAvatar} from "../../assets";
import {Fragment, useEffect, useState} from "react";
import {useAuthentication} from "../../contexts/authContext";
import {userApi} from "../../api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {omit} from "lodash";
import {toast} from "react-toastify";
import {blobToBase64, fileToBase64} from "../../utils/toBase64";

const ManagePost = () => {
	const queryClient = useQueryClient();

	const {profile} = useAuthentication();
	const [imagePreview, setImagePreview] = useState("");
	const updateUserMutation = useMutation({
		mutationFn: (data) => userApi.updateUser(data),
	});
	const {
		handleSubmit,
		control,
		setValue,
		formState: {errors},
	} = useForm({
		defaultValues: {
			name: "",
			phone: "",
			hashtag: "",
			zalo: "",
			fbUrl: "",
		},
	});
	const onSubmit = handleSubmit((data) => {
		const newData = omit({...data, avatar: imagePreview}, ["hashtag"]);
		// @ts-ignore
		updateUserMutation.mutate(newData, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ["user"],
				});
				toast.success("Cập nhật thành công");
			},
		});
	});
	const handleFiles = async (e) => {
		const imageBase64 = await fileToBase64(e.target.files[0]);
		setImagePreview(imageBase64);
	};

	useEffect(() => {
		profile?.avatar && setImagePreview(blobToBase64(profile?.avatar));
		setValue("name", profile?.name);
		setValue("hashtag", `#${profile?.id.match(/\d+/g).join("").slice(0, 6)}`);
		setValue("phone", profile?.phone);
		setValue("zalo", profile?.zalo || "");
	}, [
		profile?.avatar,
		profile?.id,
		profile?.name,
		profile?.phone,
		profile?.zalo,
		setValue,
	]);
	return (
		<div>
			<h1 className="text-3xl font-medium py-4 border-b border-gray-200">
				Đăng tin mới
			</h1>
			<form onSubmit={onSubmit} className="max-w-[700px] w-full mx-auto ">
				<div className="mt-10">
					<div className="grid grid-cols-4 items-center pb-4">
						<label htmlFor="" className="col-span-1 text-sm font-medium ">
							Mã thành viên
						</label>
						<div className="col-span-3">
							<InputReadOnly
								control={control}
								readOnly
								name="hashtag"
								type="text"
								id="hashtag"
								errorMessage={errors?.hashtag?.message}
							/>
						</div>
					</div>
					<div className="grid grid-cols-4 items-center pb-4">
						<label htmlFor="" className="col-span-1 text-sm font-medium ">
							Số điện thoại
						</label>
						<div className="col-span-3">
							<InputReadOnly
								control={control}
								readOnly
								name="phone"
								type="text"
								id="phone"
								errorMessage={errors?.phone?.message}
							/>
						</div>
					</div>
					<div className="grid grid-cols-4 items-center pb-4">
						<label htmlFor="" className="col-span-1 text-sm font-medium ">
							Tên hiển thị
						</label>
						<div className="col-span-3">
							<MyInput
								control={control}
								name="name"
								type="text"
								id="name"
								className=""
								errorMessage={errors?.name?.message}
							/>
						</div>
					</div>
					<div className="grid grid-cols-4 items-center pb-4">
						<label htmlFor="" className="col-span-1 text-sm font-medium ">
							Số Zalo
						</label>
						<div className="col-span-3">
							<MyInput
								control={control}
								name="zalo"
								type="number"
								id="zalo"
								className=""
								errorMessage={errors?.zalo?.message}
							/>
						</div>
					</div>
					<div className="grid grid-cols-4 items-center pb-4">
						<label htmlFor="" className="col-span-1 text-sm font-medium ">
							Facebook
						</label>
						<div className="col-span-3">
							<MyInput
								control={control}
								name="fbUrl"
								type="text"
								id="fbUrl"
								className=""
								errorMessage={errors?.fbUrl?.message}
							/>
						</div>
					</div>
					<div className="grid grid-cols-4 items-center py-8">
						<label htmlFor="" className="col-span-1 text-sm font-medium ">
							Mật khẩu
						</label>
						<div className="col-span-3">
							<Link to="/" className="text-primary text-sm">
								Đổi mật khẩu
							</Link>
						</div>
					</div>
					<div className="grid grid-cols-4 items-start py-4">
						<label htmlFor="" className="col-span-1 text-sm font-medium ">
							Ảnh đại diện
						</label>
						<div className="col-span-3">
							<div>
								<div className="w-[140px] h-[140px] flex-shrink-0 pb-2">
									<img
										src={imagePreview || anonAvatar}
										className="w-full h-full object-cover rounded-full"
										alt=""
									/>
								</div>
								<div className="flex flex-col gap-2">
									{imagePreview && (
										<button
											onClick={() => setImagePreview("")}
											className="bg-gray-100 text-red-500 rounded-md w-[140px] py-2"
										>
											Xóa ảnh này
										</button>
									)}
									<label
										className="bg-gray-100 rounded-md inline-block text-center w-[140px] py-2"
										htmlFor="file"
									>
										Chọn ảnh
										<input
											onChange={handleFiles}
											hidden
											type="file"
											id="file"
										/>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Button
					BeforeIcon={Fragment}
					AfterIcon={Fragment}
					type="submit"
					className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-full mt-5"
				>
					Lưu & Cập nhật
				</Button>
			</form>
		</div>
	);
};

export default ManagePost;

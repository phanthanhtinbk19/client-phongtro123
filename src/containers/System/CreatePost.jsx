/* eslint-disable no-mixed-spaces-and-tabs */
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Loading, MyInput} from "../../components";
import {useMutation, useQuery} from "@tanstack/react-query";
import {areaApi, categoryApi, postApi, priceApi, provinceApi} from "../../api";
import MySelect from "../../components/MySelect/MySelect";
import {Fragment, useState} from "react";
import InputReadOnly from "../../components/MyInput/InputReadOnly";
import MyInputV2 from "../../components/MyInput/MyInputV2";
import apiUploadImages from "../../api/image";
import icons from "../../constants/icon";
import {uploadImage} from "../../assets";
import {toast} from "react-toastify";

import {useAuthentication} from "../../contexts/authContext";
import {getCodeArea, getCodePrice} from "../../utils/getCodes";
import {omit} from "lodash";
import {schemaPost} from "../../utils/schema";
import MyReactQuill from "../../components/MyReactQuill/MyReactQuill";
const {ImBin} = icons;
const CreatePost = () => {
	const {profile} = useAuthentication();
	const [isLoading, setIsLoading] = useState(false);
	const {
		handleSubmit,
		control,
		setValue,
		getValues,
		watch,
		formState: {errors},
	} = useForm({
		defaultValues: {
			province: "",
			district: "",
			categoryCode: "",
			title: "",
			priceNumber: "",
			areaNumber: "",
			images: "",
			address: "",
			priceCode: "",
			areaCode: "",
			description: "",
			target: "Tất cả",
		},
		resolver: yupResolver(schemaPost),
	});
	const createNewPostMutation = useMutation({
		mutationFn: (data) => postApi.createNewPost(data),
	});
	const {data: pricesData} = useQuery({
		queryKey: ["listPrice"],
		queryFn: () => {
			return priceApi.getPrices();
		},
	});
	const {data: areasData} = useQuery({
		queryKey: ["listArea"],
		queryFn: () => {
			return areaApi.getAreas();
		},
	});
	const {data: categoriesData} = useQuery({
		queryKey: ["listCategory"],
		queryFn: () => {
			return categoryApi.getCategories();
		},
	});

	const categories = categoriesData?.data?.data?.categories;
	const {data: provincesData} = useQuery({
		queryKey: ["listPublicProvince"],
		queryFn: () => {
			return provinceApi.getPublicProvinces();
		},
	});
	const provinceId = watch("province") || "";
	const {data: districtsData} = useQuery({
		queryKey: ["listPublicDistrict"],
		queryFn: async () => {
			return provinceApi.getPublicDistricts(provinceId);
		},
		enabled: !!provinceId,
	});

	const [imagesPreview, setImagesPreview] = useState([]);
	const handleFiles = async (e) => {
		e.stopPropagation();
		setIsLoading(true);
		const maxUploads = 5; // Maximum number of images allowed
		let images = [];

		let files = e.target.files;
		if (files.length > maxUploads)
			return toast.warning("Chỉ được tối đa 5 ảnh");
		let formData = new FormData();
		for (let i of files) {
			formData.append("file", i);
			// @ts-ignore
			formData.append("upload_preset", import.meta.env.VITE_UPLOAD_ASSETS_NAME);
			formData.append("folder", "phongtro123");

			let response = await apiUploadImages(formData);
			if (response.status === 200)
				images = [...images, response.data?.secure_url];
		}
		setIsLoading(false);
		setImagesPreview((prev) => [...prev, ...images]);
	};
	const handleDeleteImage = (image) => {
		setImagesPreview((prev) => prev?.filter((item) => item !== image));
	};
	const onSubmit = handleSubmit((data) => {
		const priceCode =
			data?.priceNumber &&
			getCodePrice(
				pricesData?.data?.data?.prices,
				+data.priceNumber / Math.pow(10, 6)
			);
		const areaCode =
			data?.areaNumber &&
			getCodeArea(areasData?.data?.data?.areas, +data.areaNumber);
		const provinceName =
			provincesData?.data?.results
				?.find((item) => item.province_id === data?.province)
				?.province_name.replace("Thành phố ", "")
				.replace("Tỉnh ", "") || "";
		const categoryName =
			categories?.find((item) => item.code === data?.categoryCode)?.value || "";
		const label = `${categoryName} ${data?.address.split(",")[0]}`;
		const newData = omit(
			{
				...data,
				priceNumber: +data.priceNumber / Math.pow(10, 6),
				priceCode: priceCode,
				areaNumber: +data.areaNumber,
				areaCode: areaCode,
				userId: profile.id,
				province: provinceName,
				images: imagesPreview,
				label: label,
				category: categoryName,
			},
			"phone",
			"name",
			"district"
		);

		// @ts-ignore
		createNewPostMutation.mutate(newData, {
			onSuccess: () => {
				toast.success("Đăng tin thành công");
			},
		});
	});
	const handleChange = () => {
		const provinceId = getValues("province");
		const districtId = getValues("district");
		setValue(
			"address",
			`${
				districtId
					? `${
							districtsData?.data?.results?.find(
								(item) => item.district_id === districtId
							)?.district_name
					  },`
					: ""
			} ${
				provinceId
					? provincesData?.data?.results?.find(
							(item) => item.province_id === provinceId
					  )?.province_name
					: ""
			}`
		);
	};

	return (
		<div className="px-6">
			<h1 className="text-3xl font-medium py-4 border-b border-gray-200">
				Đăng tin mới
			</h1>
			<form onSubmit={onSubmit} className="">
				<div className="grid grid-cols-12 gap-5 w-full">
					<div className="col-span-8">
						<div className="my-5">
							<h2 className="text-2xl font-medium py-5">Thông tin mô tả</h2>
							<div className="grid grid-cols-2 gap-5">
								<MySelect
									control={control}
									label="Tỉnh/Thành phố"
									name="province"
									type="text"
									id="province"
									handleChange={handleChange}
									errorMessage={errors?.province?.message}
								>
									<option value="">{`--Chọn Tỉnh/Thành phố--`}</option>
									{provincesData?.data?.results?.map((item, index) => {
										return (
											<option key={index} value={item.province_id}>
												{item.province_name}
											</option>
										);
									})}
								</MySelect>
								<MySelect
									control={control}
									label="Quận/Huyện"
									name="district"
									type="text"
									id="district"
									handleChange={handleChange}
									errorMessage={errors?.district?.message}
								>
									<option value="">{`--Chọn Quận/Huyện--`}</option>
									{districtsData?.data?.results?.map((item, index) => {
										return (
											<option key={index} value={item.district_id}>
												{item.district_name}
											</option>
										);
									})}
								</MySelect>
								<div className="col-span-2">
									<InputReadOnly
										control={control}
										label="Địa chỉ chính xác"
										readOnly
										name="address"
										type="text"
										id="address"
										errorMessage={errors?.address?.message}
									/>
								</div>
							</div>
						</div>

						<div className="my-5">
							<h2 className="text-2xl font-medium py-5">Thông tin mô tả</h2>
							<div className="grid grid-cols-2 gap-5 ">
								<MySelect
									control={control}
									label="Loại chuyên mục"
									name="categoryCode"
									type="text"
									id="categoryCode"
									handleChange={() => {}}
									errorMessage={errors?.categoryCode?.message}
								>
									<option value="">{`--Chọn loại chuyên mục--`}</option>
									{categories?.map((item, index) => {
										return (
											<option key={index} value={item.code}>
												{item.value}
											</option>
										);
									})}
								</MySelect>
								<div className="col-span-2">
									<MyInput
										control={control}
										label="Tiêu đề"
										name="title"
										type="text"
										id="title"
										className=""
										errorMessage={errors.title?.message}
									/>
								</div>
								<div className="col-span-2">
									<MyReactQuill
										control={control}
										label="Nội dung mô tả"
										name="description"
										type="text"
										id="description"
										errorMessage={errors.description?.message}
									/>
								</div>
								<InputReadOnly
									control={control}
									label="Thông tin liên hệ"
									readOnly
									type="text"
									id="name"
									name="name"
									value={profile?.name || " "}
									errorMessage=""
								/>
								<InputReadOnly
									control={control}
									label="Thông tin liên hệ"
									readOnly
									type="text"
									id="phone"
									name="phone"
									value={profile?.phone || " "}
									errorMessage=""
								/>

								<div>
									<MyInputV2
										control={control}
										label="Giá cho thuê"
										name="priceNumber"
										type="number"
										min={0}
										id="priceNumber"
										errorMessage={errors.priceNumber?.message}
										kind="VNĐ"
									/>
									<span className="text-xs font-medium text-gray-500">
										Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000
									</span>
								</div>
								<MyInputV2
									control={control}
									label="Giá cho thuê"
									name="areaNumber"
									type="number"
									id="areaNumber"
									kind="m2"
									min={0}
									errorMessage={errors.areaNumber?.message}
								/>
							</div>
						</div>
						<div className="w-full mb-6">
							<h2 className="font-medium text-2xl py-4">Hình ảnh</h2>
							<small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
							<div className="w-full">
								<label
									className="w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md cursor-pointer"
									htmlFor="file"
								>
									{!isLoading ? (
										<div className="flex flex-col items-center justify-center gap-5">
											<img src={uploadImage} className="w-[90px] h-20" alt="" />
											<span>Thêm ảnh</span>
										</div>
									) : (
										<div className="text-center">
											<Loading />
										</div>
									)}
								</label>
								<input
									onChange={handleFiles}
									hidden
									type="file"
									id="file"
									multiple
								/>
								<div className="w-full">
									<h3 className="font-medium py-4">Ảnh đã chọn</h3>
									<div className="grid grid-cols-4 gap-4 items-center">
										{imagesPreview?.map((item) => {
											return (
												<div key={item} className="relative w-full h-[150px] ">
													<img
														src={item}
														alt="preview"
														className="w-full h-full object-cover rounded-md"
													/>
													<span
														title="Xóa"
														onClick={() => handleDeleteImage(item)}
														className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-full"
													>
														<ImBin size={15} className="text-red-500" />
													</span>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
						<Button
							BeforeIcon={Fragment}
							AfterIcon={Fragment}
							type="submit"
							className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-full"
						>
							Add
						</Button>
					</div>
					<div className="col-span-4">
						<div className="bg-[#fff3cd] p-4 rounded-md">
							<h2 className="text-[#856404] font-medium text-xl pb-2">
								Lưu ý khi đăng tin
							</h2>
							<ul className="text-sm font-normal text-[#856404] ">
								<li className="list-disc ml-4 py-1">
									Nội dung phải viết bằng tiếng Việt có dấu
								</li>
								<li className="list-disc ml-4 py-1">
									Tiêu đề tin không dài quá 100 kí tự
								</li>
								<li className="list-disc ml-4 py-1">
									Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có
									hiệu quả hơn.
								</li>
								<li className="list-disc ml-4 py-1">
									Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn,
									hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon
									tới đúng vị trí của tin rao.
								</li>
								<li className="list-disc ml-4 py-1">
									Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần
									so với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch
									nhanh chóng!
								</li>
							</ul>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CreatePost;

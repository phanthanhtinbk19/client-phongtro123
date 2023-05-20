import {useForm} from "react-hook-form";
import {Button, MyInput} from "../../components";
import MyTextarea from "../../components/MyTextarea/MyTextarea";
import {Fragment} from "react";

const Contact = () => {
	const {
		handleSubmit,
		control,
		setValue,
		formState: {errors},
	} = useForm({
		defaultValues: {
			name: "",
			phone: "",
			content: "",
		},
	});
	const onSubmit = handleSubmit((data) => {});
	return (
		<div className="container mx-auto">
			<h1 className="text-3xl font-bold">Liên hệ với chúng tôi</h1>
			<div className="grid grid-cols-2 gap-5 mt-5">
				<div className="rounded-3xl bg-gradient-to-br from-[#0039e4] to-[#04dbf1] px-5 py-10 text-white flex flex-col gap-4 h-fit">
					<h3 className="font-bold text-lg">Thông tin liên hệ</h3>
					<p className="font-medium">
						Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa
						chọn PhongTro123.Com
					</p>
					<div>
						<span className="font-bold text-white">Điện thoại: </span>{" "}
						<span className="font-medium">0868 827 535</span>
					</div>
					<div>
						<span className="font-bold text-white">Email: </span>
						<span className="font-medium">phanthanhtincr7@gmail.com</span>
					</div>
					<div>
						<span className="font-bold text-white">Zalo: </span>{" "}
						<span className="font-medium">0868 827 535</span>
					</div>
					<div>
						<span className="font-bold text-white">Địa chỉ: </span>
						<span className="font-medium">
							LD-06.04, Toà nhà Lexington Residence, Số 67 Mai Chí Thọ, Phường
							An Phú, Quận 2, Tp. Hồ Chí Minh
						</span>
					</div>
				</div>
				<form
					onSubmit={onSubmit}
					className="rounded-md shadow border bg-white p-7"
				>
					<h2 className="text-lg font-bold pb-4">Liên hệ trực tuyến</h2>
					<div className="flex flex-col gap-4">
						<MyInput
							control={control}
							label="HỌ TÊN CỦA BẠN"
							name="name"
							type="text"
							id="name"
							className="bg-[#e8f0fe] py-3"
							errorMessage={errors.name?.message}
						/>
						<MyInput
							control={control}
							label="SỐ ĐIỆN THOẠI"
							name="phone"
							type="text"
							id="phone"
							className="bg-[#e8f0fe] py-3"
							errorMessage={errors.phone?.message}
						/>
						<MyTextarea
							control={control}
							label="NỘI DUNG"
							name="content"
							type="text"
							id="content"
							className="bg-[#e8f0fe] w-full min-h-[100px]"
							errorMessage={errors.content?.message}
						/>
						<Button
							AfterIcon={Fragment}
							BeforeIcon={Fragment}
							type="submit"
							className="bg-primary text-white w-full text-center py-3"
						>
							<span>Gửi liên hệ</span>
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Contact;

import * as yup from "yup";
const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup.object({
	name: yup.string().required("Name is required"),
	phone: yup
		.string()
		.matches(phoneRegExp, "Phone number is not valid")
		.min(10, "Phone number must be at least 10 characters")
		.max(10, "Phone number must be at most 10 characters")
		.required("Phone number is required"),
	password: yup
		.string()
		.min(5, "Password must be at least 5 characters")
		.required("Password is required"),
	confirmPassword: yup
		.string()
		.min(5, "Password must be at least 5 characters")
		.required("Confirm Password is required")
		.oneOf([yup.ref("password")], "Passwords must match"),
});

const schemaPost = yup.object({
	title: yup.string().required("Tiêu đề không được để trống"),
	description: yup.string().required("Bạn chưa nhập nội dung"),
	priceNumber: yup.string().required("Bạn chưa nhập giá phòng"),
	areaNumber: yup.string().required("Bạn chưa nhập diện tích"),
	categoryCode: yup.string().required("Chưa chọn loại chuyên mục"),
	province: yup.string().required("Chưa chọn Tỉnh/TP"),
	district: yup.string().required("Chưa chọn Quận/Huyện"),
});

export {schema, schemaPost};

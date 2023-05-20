import {addPost, logout, managePost, savedPost, user, contact} from "../assets";

const menuManage = [
	{
		title: "Đăng tin cho thuê",
		icon: addPost,
		path: "/he-thong/tao-moi-bai-dang",
	},
	{
		title: "Quản lý tin đăng",
		icon: managePost,
		path: "/he-thong/quan-ly-bai-dang",
	},
	{
		title: "Tin đã lưu",
		icon: savedPost,
		path: "/tin-da-luu",
	},
	{
		title: "Thông tin cá nhân",
		icon: user,
		path: "/he-thong/cap-nhat-thong-tin-ca-nhan",
	},
	{
		title: "Liên hệ",
		icon: contact,
		path: "/lien-he",
	},

	{
		title: "Đăng xuất",
		icon: logout,
		path: "/sign-up",
	},
];
export default menuManage;

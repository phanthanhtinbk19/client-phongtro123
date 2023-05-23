import {logo, logout} from "../../assets";
import icons from "../../constants/icon";
import path from "../../constants/path";
import {Button, Navigation, User} from "../../components";
import {
	Link,
	createSearchParams,
	useLocation,
	useNavigate,
} from "react-router-dom";
import SearchHeader from "../../containers/Public/SearchHeader";
import {Fragment, useEffect, useRef} from "react";
import menuManage from "../../utils/menuManage";
import {useAuthentication} from "../../contexts/authContext";
import {authApi} from "../../api";
import {useMutation} from "@tanstack/react-query";
import useToggle from "../../hook/useToggle";

const {
	AiOutlineHeart,
	AiOutlinePlusCircle,
	RxDashboard,
	AiOutlineUserAdd,
	AiOutlineLogin,
} = icons;

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const ref = useRef();
	const {toggle: showMenu, setToggle: setShowMenu} = useToggle();
	const {isAuthenticated, setIsAuthenticated} = useAuthentication();
	const logoutAccountMutation = useMutation({
		mutationFn: () => authApi.logoutAccount(),
		onSuccess: () => {
			setShowMenu(false);
			setIsAuthenticated(false);
			navigate("/");
		},
	});
	const handleLogout = () => {
		logoutAccountMutation.mutate();
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
		<div className="">
			<div className="flex justify-between items-center h-[70px] container m-auto">
				<Link
					to={{
						pathname: path.home,
						search: createSearchParams({}).toString(),
					}}
					className="h-full w-[240px]"
				>
					<img src={logo} alt="" className="w-full h-full object-contain" />
				</Link>

				<div className="flex justify-center items-center">
					{isAuthenticated && (
						<div className="pr-10">
							<User />
						</div>
					)}
					<Button
						to={path.like}
						BeforeIcon={AiOutlineHeart}
						className="hover:underline"
						type=""
						AfterIcon={Fragment}
					>
						<span> Yêu thích </span>
					</Button>
					{isAuthenticated ? (
						<div className="relative" ref={ref}>
							<Button
								BeforeIcon={RxDashboard}
								className="hover:underline"
								type="button"
								AfterIcon={Fragment}
								onClick={() => setShowMenu(!showMenu)}
							>
								<span> Quản lý tài khoản </span>
							</Button>
							{showMenu && (
								<ul className="w-[200px] rounded-md shadow-md p-5 absolute top-10 bg-white z-10 left-0">
									{menuManage?.map((item, index) => (
										<li
											key={index}
											className={` py-2 ${
												index === menuManage?.length - 1 ? "" : "border-b"
											}`}
										>
											<Link
												className="flex items-center gap-2"
												rel="nofollow"
												to={item.path}
												title="Đăng tin cho thuê"
												onClick={() => setShowMenu(false)}
											>
												<span>
													<img
														src={item.icon}
														className="w-4 h-4 object-contain"
														alt=""
													/>
												</span>
												<span>{item.title}</span>
											</Link>
										</li>
									))}
									<button
										className="flex items-center gap-2 py-2"
										onClick={handleLogout}
									>
										<span>
											<img
												src={logout}
												className="w-4 h-4 object-contain"
												alt=""
											/>
										</span>
										<span>Đăng xuất</span>
									</button>
								</ul>
							)}
						</div>
					) : (
						<div className="flex items-center ">
							<Button
								to={path.login}
								BeforeIcon={AiOutlineUserAdd}
								className="hover:underline"
								type=""
								AfterIcon={Fragment}
							>
								<span> Đăng nhập </span>
							</Button>
							<Button
								to={path.register}
								BeforeIcon={AiOutlineLogin}
								className="hover:underline"
								type=""
								AfterIcon={Fragment}
							>
								<span> Đăng ký </span>
							</Button>
						</div>
					)}
					<Button
						to={`${path.SYSTEM}/${path.CREATE_POST}`}
						className="bg-secondary text-white font-medium px-2 hover:underline"
						type=""
						AfterIcon={AiOutlinePlusCircle}
						BeforeIcon={Fragment}
					>
						<span>Đăng tin mới </span>
					</Button>
				</div>
			</div>
			<Navigation />
			{!location?.pathname.includes(path.login || path.register) && (
				<SearchHeader />
			)}
		</div>
	);
};

export default Header;

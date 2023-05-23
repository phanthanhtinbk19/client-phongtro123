import {NavLink} from "react-router-dom";
import {anonAvatar} from "../../assets";
import menuManage from "../../utils/menuManage";
import {useAuthentication} from "../../contexts/authContext";
import {blobToBase64} from "../../utils/toBase64";

const activeStyle =
	" flex rounded-md items-center gap-2  text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm p-2.5 text-center mb-2";
const notActiceStyle =
	"hover:bg-gradient-to-bl hover:bg-gradient-to-r from-cyan-500 to-blue-500 flex  font-medium rounded-lg text-sm  items-center gap-2 p-2.5 cursor-pointer mb-2 hover:text-white";

const Sidebar = () => {
	const {profile} = useAuthentication();
	return (
		<div className="w-[240px] flex-none p-4 flex flex-col gap-6">
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-4">
					<img
						src={
							(profile?.avatar && blobToBase64(profile?.avatar)) || anonAvatar
						}
						alt="avatar"
						className="w-12 h-12 object-cover rounded-full border-2 border-white"
					/>
					<div className="flex flex-col justify-center">
						<span className="font-semibold">{profile?.name}</span>
						<small>{profile?.phone}</small>
					</div>
				</div>
				<span>
					Mã thành viên:{" "}
					<small className="font-medium">
						{profile?.id?.match(/\d/g).join("")?.slice(0, 6)}
					</small>
				</span>
			</div>
			<div>
				{menuManage?.map((item, index) => {
					return (
						<NavLink
							className={({isActive}) =>
								isActive ? activeStyle : notActiceStyle
							}
							key={index}
							to={item?.path}
						>
							<span>
								<img
									src={item.icon}
									className="w-4 h-4 object-contain"
									alt=""
								/>
							</span>
							<span>{item.title}</span>
						</NavLink>
					);
				})}
			</div>
		</div>
	);
};

export default Sidebar;

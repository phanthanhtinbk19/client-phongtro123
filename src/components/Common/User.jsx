import {Link} from "react-router-dom";
import {anonAvatar} from "../../assets";
import {useAuthentication} from "../../contexts/authContext";
import {blobToBase64} from "../../utils/toBase64";
import path from "../../constants/path";

const User = () => {
	const {profile} = useAuthentication();

	return (
		<Link
			to={`${path.SYSTEM}/${path.MANAGE_POST}`}
			className="flex items-center gap-3"
		>
			<div className="w-10 h-10 flex-shrink-0">
				<img
					src={(profile?.avatar && blobToBase64(profile?.avatar)) || anonAvatar}
					className="w-full h-full object-cover rounded-full "
					alt=""
				/>
			</div>
			<div className="">
				<div className="flex items-center gap-1">
					<span>Xin chào,</span>
					<span className="font-medium capitalize">{profile?.name}</span>
				</div>
				<div className="flex items-center gap-1">
					<span className="text-sm">Mã tài khoản: </span>
					<span className="font-medium text-sm">
						{profile?.id?.match(/\d/g).join("")?.slice(0, 6)}
					</span>
				</div>
			</div>
		</Link>
	);
};

export default User;

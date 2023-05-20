import {Link} from "react-router-dom";
import {Navigation} from "../../components";
import path from "../../constants/path";

const Header = () => {
	return (
		<div className="w-full flex flex-none h-[40px]">
			<Link
				to={path.home}
				className="flex items-center font-bold bg-primary text-white w-[256px] flex-none  pl-4"
			>
				Phongtro123.com
			</Link>
			<div className="flex-auto">
				<Navigation />
			</div>
		</div>
	);
};

export default Header;

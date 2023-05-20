import {Outlet} from "react-router-dom";
import {Header, Sidebar} from "./";

const System = () => {
	// if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
	return (
		<div className="w-full h-screen flex flex-col items-center">
			<Header />
			<div className="flex w-full flex-auto">
				<Sidebar />
				<div className="flex-auto bg-white shadow-md h-full p-4">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default System;

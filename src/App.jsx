import {Route, Routes} from "react-router-dom";
import {Home, Login, Register} from "./containers/Public";
import MainLayout from "./layouts/MainLayout";
import path from "./constants/path";
import DetailPost from "./containers/Public/DetailPost";
import Rental from "./containers/Public/Rental";
import SearchDetail from "./containers/Public/SearchDetail";
import {CreatePost, System} from "./containers/System";
import ManagePost from "./containers/System/ManagePost";
import Contact from "./containers/Public/Contact";
import ManageProfile from "./containers/System/ManageProfile";

function App() {
	return (
		<div>
			<Routes>
				<Route path={path.home} element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="/:category" element={<Rental />} />
					<Route path={path.login} element={<Login />} />
					<Route path={path.register} element={<Register />} />
					<Route path="posts/:id" element={<DetailPost />} />
					<Route
						path={`/${path.SEARCH}/:category`}
						element={<SearchDetail />}
					/>
					<Route path={path.CONTACT} element={<Contact />} />
				</Route>
				<Route path={path.SYSTEM} element={<System />}>
					<Route path={path.CREATE_POST} element={<CreatePost />} />
					<Route path={path.MANAGE_POST} element={<ManagePost />} />
					<Route path={path.MANAGE_PROFILE} element={<ManageProfile />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;

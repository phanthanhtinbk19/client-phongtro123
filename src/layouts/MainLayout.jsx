import {Outlet} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Footer, GoTop, Header} from "../components";

const MainLayout = () => {
	const [showGoTop, setshowGoTop] = useState(false);
	const handleVisibleButton = () => {
		const position = window.pageYOffset;

		if (position > 50) {
			return setshowGoTop(true);
		} else if (position < 50) {
			return setshowGoTop(false);
		}
	};
	const refScrollUp = useRef(null);
	const handleScrollUp = () => {
		refScrollUp.current.scrollIntoView({behavior: "smooth"});
	};
	useEffect(() => {
		window.addEventListener("scroll", handleVisibleButton);
	});
	return (
		<div className="w-full h-full m-auto bg-bgGray">
			<div ref={refScrollUp}> </div>
			<GoTop showGoTop={showGoTop} scrollUp={handleScrollUp} />
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};

export default MainLayout;

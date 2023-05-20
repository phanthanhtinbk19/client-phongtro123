import icons from "../../constants/icon";
const {BsArrowUp} = icons;
const GoTop = ({showGoTop, scrollUp}) => {
	return (
		<>
			<div className={`${showGoTop ? "block" : "hidden"}`} onClick={scrollUp}>
				<button className="w-12 h-12 text-white bg-[#f83859] rounded-full flex items-center justify-center fixed cursor-pointer bottom-[5%] right-[2%] transition-all">
					<BsArrowUp size={25} />
				</button>
			</div>
		</>
	);
};
export default GoTop;

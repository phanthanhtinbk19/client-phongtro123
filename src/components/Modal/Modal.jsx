/* eslint-disable no-mixed-spaces-and-tabs */
import ReactDOM from "react-dom";
import {useEffect, useState} from "react";
import _ from "lodash";
import {
	convert100toTarget,
	convertto100,
	getNumbersArea,
	getNumbersPrice,
} from "../../utils/common";
import icons from "../../constants/icon";
const {BsArrowLeft} = icons;
const Modal = ({content, name, onClose, handleSubmit, queries, arrMinMax}) => {
	const [persent1, setPersent1] = useState(
		name === "price" && arrMinMax?.priceArr
			? arrMinMax?.priceArr[0]
			: name === "area" && arrMinMax?.areaArr
			? arrMinMax?.areaArr[0]
			: 0
	);
	const [persent2, setPersent2] = useState(
		name === "price" && arrMinMax?.priceArr
			? arrMinMax?.priceArr[1]
			: name === "area" && arrMinMax?.areaArr
			? arrMinMax?.areaArr[1]
			: 100
	);
	const [activedEl, setActivedEl] = useState("");
	useEffect(() => {
		const activedTrackEl = document.getElementById("track-active");
		if (activedTrackEl) {
			if (persent2 <= persent1) {
				activedTrackEl.style.left = `${persent2}%`;
				activedTrackEl.style.right = `${100 - persent1}%`;
			} else {
				activedTrackEl.style.left = `${persent1}%`;
				activedTrackEl.style.right = `${100 - persent2}%`;
			}
		}
	}, [persent1, persent2]);
	const handleClickTrack = (e, value) => {
		const stackEl = document.getElementById("track");
		const stackRect = stackEl.getBoundingClientRect();
		let percent = value
			? value
			: Math.round(((e.clientX - stackRect.left) * 100) / stackRect.width);
		if (Math.abs(percent - persent1) <= Math.abs(percent - persent2)) {
			setPersent1(percent);
		} else {
			setPersent2(percent);
		}
	};

	const handleActive = (code, value) => {
		setActivedEl(code);
		let arrMaxMin =
			name === "price" ? getNumbersPrice(value) : getNumbersArea(value);

		if (arrMaxMin.length === 1) {
			if (arrMaxMin[0] === 1) {
				setPersent1(0);
				setPersent2(convertto100(1, name));
			}
			if (arrMaxMin[0] === 20) {
				setPersent1(0);
				setPersent2(convertto100(20, name));
			}
			if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
				setPersent1(100);
				setPersent2(100);
			}
		}
		if (arrMaxMin.length === 2) {
			setPersent1(convertto100(arrMaxMin[0], name));
			setPersent2(convertto100(arrMaxMin[1], name));
		}
	};
	const handleBeforeSubmit = () => {
		let min = persent1 <= persent2 ? persent1 : persent2;
		let max = persent1 <= persent2 ? persent2 : persent1;

		let arrMinMax = [
			convert100toTarget(min, name),
			convert100toTarget(max, name),
		];
		handleSubmit(
			{
				[`${name}Number`]: arrMinMax,
				[`${name}Code`]: `Từ ${convert100toTarget(
					min,
					name
				)} - ${convert100toTarget(max, name)} ${
					name === "price" ? "triệu" : "m2"
				}`,
			},
			{
				[`${name}Arr`]: [min, max],
			}
		);
	};

	return ReactDOM.createPortal(
		<div className="fixed inset-0 flex justify-center items-center modal z-50">
			<div
				className="absolute inset-0 bg-black/25 overlay"
				onClick={onClose}
			></div>
			<div className="modal-content relative bg-white rounded-md w-full max-w-[700px] max-h-[500px] h-full overflow-y-auto  z-10 ">
				<div className="">
					<div className="flex items-center border-b border-slate-300 p-4">
						<BsArrowLeft
							className="inline-block cursor-pointer"
							size={25}
							onClick={onClose}
						/>
						<div className="flex justify-center w-full">
							<span className="text-lg uppercase font-bold">
								{name === "category"
									? "Chọn danh mục"
									: name === "province"
									? "Chọn tỉnh thành"
									: name === "price"
									? "Chọn giá"
									: "Chọn diện tích"}
							</span>
						</div>
					</div>
					{(name === "category" || name === "province") && (
						<div className="px-10">
							{name === "province" ? (
								<div className="flex items-center py-4 border-b">
									<input
										id="default-radio-1"
										type="radio"
										value="all"
										name="default-radio"
										className="w-4 h-4 text-blue-600 "
									/>
									<label
										htmlFor="default-radio-1"
										className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>
										Toàn quốc
									</label>
								</div>
							) : (
								<div className="flex items-center py-4 border-b">
									<input
										id="default-radio-1"
										type="radio"
										value="all"
										name="default-radio"
										className="w-4 h-4 text-blue-600 "
									/>
									<label
										htmlFor="default-radio-1"
										className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>
										Tất cả danh mục
									</label>
								</div>
							)}
							{content?.map((item, index) => (
								<div key={index} className="flex items-center py-4 border-b">
									<input
										id="default-radio-1"
										type="radio"
										value={item.code}
										name="default-radio"
										checked={queries[name]?.[`${name}Code`] === item.code}
										className="w-4 h-4 text-blue-600 "
										onChange={() =>
											handleSubmit({
												name: item.value,
												[`${name}Code`]: item.code,
											})
										}
									/>
									<label
										htmlFor="default-radio-1"
										className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>
										{item.value}
									</label>
								</div>
							))}
						</div>
					)}
					{(name === "price" || name === "area") && (
						<div className="py-20 px-10">
							<div className="flex flex-col justify-center items-center relative ">
								<div className="absolute z-30 -top-[48px] text-xl text-cyan-600 ">
									<span className="text-xl font-bold">
										{persent1 === 100 && persent2 === 100
											? `Trên ${convert100toTarget(persent1, name)} ${
													name === "price" ? "triệu" : "m2"
											  } +`
											: `Từ ${
													persent1 <= persent2
														? convert100toTarget(persent1, name)
														: convert100toTarget(persent2, name)
											  } - ${
													persent2 >= persent1
														? convert100toTarget(persent2, name)
														: convert100toTarget(persent1, name)
											  } ${name === "price" ? "triệu" : "m2"}`}
									</span>
								</div>
								<div
									onClick={handleClickTrack}
									id="track"
									className="slider-track h-[5px] absolute top-0 bottom-0 w-full bg-gray-300 rounded-full"
								></div>
								<div
									onClick={handleClickTrack}
									id="track-active"
									className="slider-track-active h-[5px] absolute top-0 bottom-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full  "
								></div>
								<input
									max="100"
									min="0"
									step="1"
									type="range"
									value={persent1}
									className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
									onChange={(e) => setPersent1(+e.target.value)}
								/>
								<input
									max="100"
									min="0"
									step="1"
									type="range"
									value={persent2}
									className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
									onChange={(e) => setPersent2(+e.target.value)}
								/>
								<div className="absolute z-30 top-6 left-0 right-0 flex justify-between items-center">
									<span
										className="cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											handleClickTrack(e, 0);
										}}
									>
										0
									</span>
									<span
										className="mr-[-12px] cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											handleClickTrack(e, 100);
										}}
									>
										{name === "price"
											? "15 triệu +"
											: name === "area"
											? "Trên 90 m2"
											: ""}
									</span>
								</div>
							</div>
							<div className="mt-24">
								<h4 className="font-medium mb-4">Chọn nhanh:</h4>
								<div className="grid grid-cols-4 gap-2 items-center">
									{_.sortBy(content, [
										function (o) {
											return o.order;
										},
									])?.map((item) => {
										return (
											<button
												key={item.code}
												onClick={() => handleActive(item.code, item.value)}
												className={`text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2 col-span-1 }`}
											>
												{name === "price" ? item.value : item.value}
											</button>
										);
									})}
								</div>
							</div>
						</div>
					)}
				</div>
				{(name === "price" || name === "area") && (
					<div className="w-full max-w-[700px] absolute bottom-0 bg-gradient-to-r from-cyan-500 to-blue-500 py-3  rounded-bl-md rounded-br-md text-center font-bold cursor-pointer">
						<button
							type="button"
							className="text-white"
							onClick={handleBeforeSubmit}
						>
							ÁP DỤNG
						</button>
					</div>
				)}
			</div>
		</div>,
		document.querySelector("body")
	);
};

export default Modal;

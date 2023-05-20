import {provinceLocation} from "../../utils/common";

const CardProvince = () => {
	const locationData = provinceLocation("CTPT");
	return (
		<div className="flex items-center gap-5 justify-center mb-5">
			{locationData?.map((item, index) => (
				<div
					key={index}
					className="w-[190px] h-[150px] bg-white border border-gray-200 rounded-lg shadow text-primary  hover:text-secondary cursor-pointer"
				>
					<div className="w-full h-[110px] flex-shrink-0">
						<img
							className="rounded-t-lg w-full h-full object-cover"
							src={item.image}
							alt=""
						/>
					</div>
					<div className="p-2 text-center">
						<span className="font-bold  text-sm dark:text-gray-400">
							{item.name}
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default CardProvince;

/* eslint-disable no-mixed-spaces-and-tabs */
import {useEffect, useState} from "react";
import icons from "../../constants/icon";
import {useQuery} from "@tanstack/react-query";
import {areaApi, categoryApi, priceApi, provinceApi} from "../../api";
import {ItemSearch} from "../../components";
import useQueryConfig from "../../hook/useQueryConfig";
import {Link, createSearchParams, useLocation} from "react-router-dom";
import {isUndefined, omitBy} from "lodash";
import path from "../../constants/path";
import {Modal} from "../../components";
import slugify from "slugify";
import {getNumbersPrice} from "../../utils/common";

const {
	BsBuilding,
	CiLocationOn,
	RiDeleteBack2Line,
	BiChevronRight,
	IoPricetagOutline,
	BiArea,
	AiOutlineSearch,
} = icons;
const SearchHeader = () => {
	const queryConfig = useQueryConfig();
	const location = useLocation();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [content, setContent] = useState("");
	const [name, setName] = useState("");
	const [queries, setQueries] = useState({});
	const [arrMinMax, setArrMinMax] = useState({});
	const {data: provincesData} = useQuery({
		queryKey: ["listProvince"],
		queryFn: () => {
			return provinceApi.getProvinces();
		},
	});
	const {data: pricesData} = useQuery({
		queryKey: ["listPrice"],
		queryFn: () => {
			return priceApi.getPrices();
		},
	});
	const {data: areasData} = useQuery({
		queryKey: ["listArea"],
		queryFn: () => {
			return areaApi.getAreas();
		},
	});
	const {data: categoriesData} = useQuery({
		queryKey: ["listCategory"],
		queryFn: () => {
			return categoryApi.getCategories();
		},
	});
	const provinces = provincesData?.data?.data?.provinces;
	const prices = pricesData?.data?.data?.prices;
	const categories = categoriesData?.data?.data?.categories;
	const areas = areasData?.data?.data?.areas;

	const handleShowModal = (content, name) => {
		setContent(content);
		setName(name);
		setIsModalOpen(true);
	};

	const handleSubmit = (query, arrMaxMin) => {
		setQueries({...queries, [name]: query});
		setArrMinMax((prev) => ({...prev, ...arrMaxMin}));
		setIsModalOpen(false);
	};

	useEffect(() => {
		if (!location?.pathname.includes(path.SEARCH)) {
			setArrMinMax({});
			setQueries({});
		}
	}, [location]);

	return (
		<>
			<div className="container  bg-[#febb02]  px-3 py-2 rounded-md mx-auto my-2">
				<div className="grid grid-cols-5 gap-2">
					<button
						onClick={() => handleShowModal(categories, "category")}
						className=" p-2  rounded-md flex items-center bg-white"
					>
						<ItemSearch
							defaultText="Tất cả danh mục"
							text={
								queries["category"]?.name || location?.state?.category?.name
							}
							BeforeIcon={BsBuilding}
							AfterIcon={RiDeleteBack2Line}
							name="category"
							setQueries={setQueries}
						/>
					</button>
					<button
						onClick={() => handleShowModal(provinces, "province")}
						className=" p-2 rounded-md flex items-center bg-white"
					>
						<ItemSearch
							defaultText="Toàn quốc"
							text={queries["province"]?.name}
							BeforeIcon={CiLocationOn}
							AfterIcon={
								queries["province"] ? RiDeleteBack2Line : BiChevronRight
							}
							name="province"
							setQueries={setQueries}
						/>
					</button>
					<button
						onClick={() => handleShowModal(prices, "price")}
						className=" p-2  rounded-md flex items-center bg-white"
					>
						<ItemSearch
							defaultText="Chọn giá"
							text={
								queries["price"]?.priceCode || location?.state?.price?.priceCode
							}
							BeforeIcon={IoPricetagOutline}
							AfterIcon={queries["price"] ? RiDeleteBack2Line : BiChevronRight}
							name="price"
							setQueries={setQueries}
						/>
					</button>
					<button
						onClick={() => handleShowModal(areas, "area")}
						className=" p-2  rounded-md flex items-center bg-white"
					>
						<ItemSearch
							defaultText="Chọn diện tích"
							text={
								queries["area"]?.areaCode || location?.state?.price?.areaCode
							}
							BeforeIcon={BiArea}
							AfterIcon={queries["area"] ? RiDeleteBack2Line : BiChevronRight}
							name="area"
							setQueries={setQueries}
						/>
					</button>

					<Link
						to={{
							pathname: `/${path.SEARCH}/${slugify(
								queries["category"]?.name?.toLowerCase() || ""
							)}`,
							search: createSearchParams(
								omitBy(
									{
										...queryConfig,
										provinceCode: queries["province"]?.provinceCode,
										priceTo: queries["price"]?.priceNumber[0],
										priceFrom: queries["price"]?.priceNumber[1],
										areaTo: queries["area"]?.areaNumber[0],
										areaFrom: queries["area"]?.areaNumber[1],
									},
									isUndefined
								)
							).toString(),
						}}
						// Object.keys(queries).length !== 0
						state={{...queries}}
						className={`p-2  rounded-md flex gap-1 items-center justify-center bg-primary `}
					>
						<AiOutlineSearch className="text-white font-bold " size={20} />
						<span className="text-white font-medium">Tìm kiếm</span>
					</Link>
				</div>
			</div>
			{isModalOpen && (
				<Modal
					onClose={() => setIsModalOpen(false)}
					content={content}
					name={name}
					handleSubmit={handleSubmit}
					queries={queries}
					arrMinMax={arrMinMax}
				/>
			)}
		</>
	);
};

export default SearchHeader;

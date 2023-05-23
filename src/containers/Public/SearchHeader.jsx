/* eslint-disable no-mixed-spaces-and-tabs */
import {useEffect, useState} from "react";
import icons from "../../constants/icon";
import {ItemSearch} from "../../components";
import useQueryConfig from "../../hook/useQueryConfig";
import {
	Link,
	createSearchParams,
	useLocation,
	useParams,
} from "react-router-dom";
import _, {isUndefined, omit, omitBy} from "lodash";
import path from "../../constants/path";
import {Modal} from "../../components";
import slugify from "slugify";
import {useApp} from "../../contexts/appContext";

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
	const {category} = useParams();
	const queryConfig = useQueryConfig();
	const [newCategories, setNewCategories] = useState([]);
	const {prices, categories, areas, provinces, queries, setQueries} = useApp();
	const location = useLocation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [content, setContent] = useState("");
	const [name, setName] = useState("");

	const categoryItem = categories?.find(
		(item) => slugify(item?.value.toLowerCase(), "-") === category
	);

	useEffect(() => {
		const isObjectExists = _.find(newCategories, {
			id: 0,
		});
		const isProvinceExists = _.find(provinces, {
			code: "ALL",
		});
		categories?.length > 0 &&
			!isObjectExists &&
			setNewCategories([
				{id: 0, code: "ALL", value: "Tất cả danh mục"},
				...categories,
			]);

		provinces?.length > 0 &&
			!isProvinceExists &&
			provinces.unshift({code: "ALL", value: "Toàn quốc"});
	}, [categories, newCategories, provinces]);

	const handleShowModal = (content, name) => {
		setContent(content);
		setName(name);
		setIsModalOpen(true);
	};

	const handleSubmit = (query) => {
		setQueries({...queries, [name]: query});
		setIsModalOpen(false);
	};
	// console.log(categories);
	useEffect(() => {
		if (!location?.pathname.includes(path.SEARCH)) {
			setQueries({});
		}
		location?.state
			? setQueries((prev) => ({...prev, ...location.state}))
			: category &&
			  setQueries((prev) => ({
					...prev,
					category: {
						name: categoryItem?.value,
						categoryCode: categoryItem?.code,
					},
			  }));
	}, [category, categoryItem?.code, categoryItem?.value, location, setQueries]);

	return (
		<>
			<div className="container  bg-[#febb02]  px-3 py-2 rounded-md mx-auto my-2">
				<div className="grid grid-cols-5 gap-2">
					<ItemSearch
						defaultText="Tất cả danh mục"
						text={queries["category"]?.name}
						BeforeIcon={BsBuilding}
						AfterIcon={RiDeleteBack2Line}
						name="category"
						setQueries={setQueries}
						onClick={() => handleShowModal(newCategories, "category")}
					/>
					<ItemSearch
						defaultText="Toàn quốc"
						text={queries["province"]?.name}
						BeforeIcon={CiLocationOn}
						AfterIcon={queries["province"] ? RiDeleteBack2Line : BiChevronRight}
						name="province"
						setQueries={setQueries}
						onClick={() => handleShowModal(provinces, "province")}
					/>
					<ItemSearch
						defaultText="Chọn giá"
						text={queries["price"]?.priceCode}
						BeforeIcon={IoPricetagOutline}
						AfterIcon={queries["price"] ? RiDeleteBack2Line : BiChevronRight}
						name="price"
						setQueries={setQueries}
						onClick={() => handleShowModal(prices, "price")}
					/>
					<ItemSearch
						defaultText="Chọn diện tích"
						text={queries["area"]?.areaCode || location?.state?.price?.areaCode}
						BeforeIcon={BiArea}
						AfterIcon={queries["area"] ? RiDeleteBack2Line : BiChevronRight}
						name="area"
						setQueries={setQueries}
						onClick={() => handleShowModal(areas, "area")}
					/>
					<Link
						to={{
							pathname: `/${path.SEARCH}/${slugify(
								queries["category"]?.name?.toLowerCase() || ""
							)}`,
							search: createSearchParams(
								omit(
									omitBy(
										{
											...queryConfig,
											provinceCode:
												queries["province"]?.provinceCode === "ALL"
													? undefined
													: queries["province"]?.provinceCode,
											priceTo: queries["price"]?.priceNumber[0],
											priceFrom:
												queries["price"]?.priceNumber[0] === 15
													? undefined
													: queries["price"]?.priceNumber[1],
											areaTo: queries["area"]?.areaNumber[0],
											areaFrom:
												queries["area"]?.areaNumber[0] === 90
													? undefined
													: queries["area"]?.areaNumber[1],
										},
										isUndefined
									),
									["page"]
								)
							).toString(),
						}}
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
					queryConfig={queryConfig}
				/>
			)}
		</>
	);
};

export default SearchHeader;

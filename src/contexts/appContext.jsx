import {useQuery} from "@tanstack/react-query";
import {createContext, useContext, useState} from "react";
import {areaApi, categoryApi, postApi, priceApi, provinceApi} from "../api";

const initialAppContext = {
	provinces: [],
	prices: [],
	categories: [],
	areas: [],
};
const AppContext = createContext(initialAppContext);

const AppProvider = ({children}) => {
	const [queries, setQueries] = useState({});
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
	const {data: newPostsData} = useQuery({
		queryKey: ["newPostList"],
		queryFn: () => {
			return postApi.getNewPosts();
		},
	});

	const newPosts = newPostsData?.data?.data?.posts;
	const provinces = provincesData?.data?.data?.provinces;
	const prices = pricesData?.data?.data?.prices;
	const categories = categoriesData?.data?.data?.categories;
	const areas = areasData?.data?.data?.areas;
	return (
		<AppContext.Provider
			value={{
				provinces,
				prices,
				categories,
				newPosts,
				areas,
				queries,
				setQueries,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const useApp = () => {
	const context = useContext(AppContext);
	if (typeof context === "undefined") {
		throw new Error("useApp must be within AppProvider");
	}
	return context;
};

export {AppProvider, useApp};

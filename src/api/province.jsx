import axios from "axios";
import http from "../utils/http";

const getProvinces = () => {
	return http.get("/provinces");
};
const getPublicProvinces = async () => {
	try {
		const response = await axios.get("https://vapi.vnappmob.com/api/province/");
		return response;
	} catch (error) {
		console.error(error);
	}
};
const getPublicDistricts = async (provinceId) => {
	try {
		const response = await axios.get(
			`https://vapi.vnappmob.com/api/province/district/${provinceId}`
		);
		return response;
	} catch (error) {
		console.error(error);
	}
};

export {getProvinces, getPublicProvinces, getPublicDistricts};

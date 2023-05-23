import axios from "axios";
import HttpStatusCode from "../constants/httpStatusCode";
import {toast} from "react-toastify";
import {clearLS, getAccessTokenFromLS, setAccessTokenToLS} from "./auth";

let accessToken = getAccessTokenFromLS() || "";
const http = axios.create({
	// baseURL: "https://be-shopee-clone-ofp5la5qj-phanthanhtinbk19.vercel.app/api",
	baseURL: "https://server-phongtro123.vercel.app/api/v1",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});
http.interceptors.request.use(
	(config) => {
		if (config.headers && accessToken) {
			config.headers.authorization = `Bearer ${accessToken}`;
			return config;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Add a response interceptor
http.interceptors.response.use(
	(response) => {
		const {url} = response.config;

		const data = response.data;
		if (url === "/auth/register" || url === "/auth/login") {
			accessToken = data?.data?.access_token;
			setAccessTokenToLS(accessToken);
			// setProfileToLS(data.data.user);
		} else if (url === "/auth/logout") {
			clearLS();
		}
		return response;
	},
	function (error) {
		if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
			const data = error.response?.data;
			const message = data?.message || error.message;
			toast.error(message);
		}
		if (error.response?.status === HttpStatusCode.Unauthorized) {
			clearLS();
		}

		return Promise.reject(error);
	}
);
export default http;

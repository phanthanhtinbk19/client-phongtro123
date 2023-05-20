import http from "../utils/http";

const getPrices = () => {
	return http.get("/prices");
};

export {getPrices};

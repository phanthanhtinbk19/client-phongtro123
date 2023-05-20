import http from "../utils/http";

const getAreas = () => {
	return http.get("/areas");
};

export {getAreas};

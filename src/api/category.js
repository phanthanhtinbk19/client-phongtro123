import http from "../utils/http";

const getCategories = () => {
	return http.get("/categories ");
};

export {getCategories};

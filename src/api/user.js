import http from "../utils/http";

const getCurrentUser = () => {
	try {
		return http.get("/users/get-current ");
	} catch (error) {
		console.error(error);
	}
};
const updateUser = (user) => {
	try {
		return http.put("/users/update-profile", user);
	} catch (error) {
		console.error(error);
	}
};
export {getCurrentUser, updateUser};

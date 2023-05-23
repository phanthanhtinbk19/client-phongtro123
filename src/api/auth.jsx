import http from "../utils/http";

const registerAccount = (data) => {
	return http.post("/auth/register", data);
};
const loginAccount = (data) => {
	return http.post("/auth/login", data);
};
const logoutAccount = () => {
	return http.post("/auth/logout");
};
export {registerAccount, loginAccount, logoutAccount};

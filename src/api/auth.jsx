import http from "../utils/http";

const registerAccount = (data) => {
	return http.post("/auth/register", data);
};
const loginAccount = (data) => {
	return http.post("/auth/login", data);
};
export {registerAccount, loginAccount};

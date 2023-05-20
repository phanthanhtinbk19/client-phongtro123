const setAccessTokenToLS = (access_token) => {
	localStorage.setItem("access_token", access_token);
};

const clearLS = () => {
	localStorage.removeItem("access_token");
	localStorage.removeItem("profile");
};

const getAccessTokenFromLS = () => {
	return localStorage.getItem("access_token") || "";
};

const getProfileFromLS = () => {
	const result = localStorage.getItem("profile");
	return result ? JSON.parse(result) : null;
};
const setProfileToLS = (profile) => {
	localStorage.setItem("profile", JSON.stringify(profile));
};
export {
	setAccessTokenToLS,
	clearLS,
	getAccessTokenFromLS,
	getProfileFromLS,
	setProfileToLS,
};

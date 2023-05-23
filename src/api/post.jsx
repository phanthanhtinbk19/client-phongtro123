import http from "../utils/http";

const getPosts = (params) => {
	return http.get("/posts", {
		params,
	});
};
const getSinglePost = (id) => {
	return http.get(`/posts/${id}`);
};
const getNewPosts = () => {
	return http.get("/posts/new");
};
const getPrivatePosts = () => {
	return http.get("/posts/private");
};
const createNewPost = (data) => {
	return http.post("/posts/create-new", data);
};
const updatePost = (data) => {
	return http.put("/posts/update", data);
};
const deletePost = (id) => {
	return http.delete(`/posts/delete/${id}`);
};

export {
	getPosts,
	getSinglePost,
	getNewPosts,
	createNewPost,
	getPrivatePosts,
	updatePost,
	deletePost,
};

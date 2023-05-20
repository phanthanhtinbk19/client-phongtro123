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
const createNewPost = (data) => {
	return http.post("/posts/create-new", data);
};
export {getPosts, getSinglePost, getNewPosts, createNewPost};

import api from "./axiosConfig";

const createPost = async (data) => {
	return await api.post("/posts/create", data);
};

const updatePostData = async (data) => {
	return await api.post("/posts/update-data", data);
};

const updatePostImage = async (data) => {
	return await api.post("/posts/update-image", data);
};

const allPosts = async (page = 1, limit = 9,pagination) => {
    return await api.get(`/posts/all-posts?page=${page}&limit=${limit}&pagination=${pagination}`);
};

const getPost = async (slug) => {
	return await api.get(`/posts/get-post/${slug}`);
};

export { createPost, updatePostData, updatePostImage, allPosts, getPost };

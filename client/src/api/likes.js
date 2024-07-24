import api from "./axiosConfig";


const likePost = async (postId) => {
	return await api.post(`/likes/post/${postId}`);
};


const likeComment = async (commentId) => {
	return await api.post(`/likes/comment/${commentId}`);
};


const unlike = async (likeId) => {
	return await api.delete(`/likes/delete/${likeId}`);
};

export {likePost,likeComment,unlike}
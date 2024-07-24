import api from "./axiosConfig";

const getCurrentUser = async () => {
	return await api.get("/users/get-user");
};

const allUsers = async () => {
	return await api.get("/users/all-users");
};


const login = async (data) => {
	return await api.post("/users/login", data);
};

const logout = async (data) => {
	return await api.post("/users/logout");
};

const signUp = async (data) => {
	return await api.post("/users/register", data);
};

const updateUserData = async (data) => {
	return await api.patch("/users/update-user-details", data);
};

const updateAvatar = async (data) => {
	return await api.post("/users/update-avatar", data);
};

const changePassword = async (data) => {
	return await api.post("/users/change-password", data);
};



export {
	getCurrentUser,
	allUsers,
	login,
	logout,
	signUp,
	updateAvatar,
	updateUserData,
	changePassword,
};

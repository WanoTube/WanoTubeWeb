import Repository from "./Repository";

const resource = "/users";

function get() {
	const header = JSON.parse(localStorage.getItem('token'));
	const config = {
		headers: {
			"Authorization": `Bear ${header}`
		}
	}
	return Repository.get(`${resource}`, config);
}

function getUser(userId) {
	return Repository.get(`${resource}/${userId}`);
}

function getAccountByUserId(userId) {
	return Repository.get(`${resource}/account/${userId}`);
}

function createUser(payload) {
	return Repository.post(`${resource}`, payload)
}

function updateUser(payload) {
	return Repository.put(`${resource}/update`, payload)
}

function deleteUser(userId) {
	return Repository.put(`${resource}/${userId}`)
}

function getAvatar(key) {
	return Repository.get(`${resource}/avatar/${key}`)
}

function updateAvatar(payload) {
	return Repository.post(`${resource}/avatar/`, payload)
}

export default {
	get,
	getUser,
	getAccountByUserId,
	createUser,
	updateUser,
	deleteUser,
	getAvatar,
	updateAvatar
}
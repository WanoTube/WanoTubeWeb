import Repository from "./Repository";

const resource = "/users";

let header = JSON.parse(localStorage.getItem('token'));
const config = {
    headers: {
        "auth-token": header
    }
}

function get() {    
    return Repository.get(`${resource}`, config);
}

function getUser(userId) {
    return Repository.get(`${resource}/${userId}`);
}

function getUserByUsername(username) {
    return Repository.get(`${resource}/search?username=${username}`);
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
    getUserByUsername,
    getAccountByUserId,
    createUser,
    updateUser,
    deleteUser,
    getAvatar,
    updateAvatar
}
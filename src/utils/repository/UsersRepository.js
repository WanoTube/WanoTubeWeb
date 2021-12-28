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
    return Repository.get(`${resource}/${userId}`, config);
}

function getUserByUsername(username) {
    return Repository.get(`${resource}/${username}`, config);
}

function createUser(payload) {
    return Repository.post(`${resource}`, payload)
}

function updateUser(userId, payload) {
    return Repository.put(`${resource}/${userId}`, payload)
}

function deleteUser(userId) {
    return Repository.put(`${resource}/${userId}`)
}

function getAvatar(key) {
    return Repository.get(`${resource}/avatar/${key}`)
}

export default {
    get, 
    getUser,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser,
    getAvatar
}
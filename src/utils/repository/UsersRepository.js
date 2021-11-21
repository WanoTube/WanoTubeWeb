import Repository from "./Repository";

const resource = "/users";

function get() {
    return Repository.get(`${resource}`);
}

function getUser(userId) {
    return Repository.get(`${resource}/${userId}`);
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

export default {
    get, 
    getUser,
    createUser,
    updateUser,
    deleteUser
}
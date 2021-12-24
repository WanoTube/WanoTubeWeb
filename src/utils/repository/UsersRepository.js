import Repository from "./Repository";

const resource = "/users";

function get() {
    let header = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            "auth-token": header
        }
    }
    return Repository.get(`${resource}`, config);
}

function getUser(userId) {
    return Repository.get(`${resource}/${userId}`, );
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
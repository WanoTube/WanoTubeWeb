import Repository from "./Repository";

const resource = "/auth";

function login(payload) {
    return Repository.post(`${resource}/login`, payload);
}

function signup(payload) {
    return Repository.post(`${resource}/register`, payload);
}

export default {
    login,
    signup
}
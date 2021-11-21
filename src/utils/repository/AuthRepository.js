import Repository from "./Repository";

const resource = "/auth";

function login(payload) {
    return Repository.post(`${resource}/login`, payload);
}

export default {
    login
}
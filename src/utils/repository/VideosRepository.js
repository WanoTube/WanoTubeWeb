import Repository from "./Repository";

const resource = "/videos";

function get() {
    return Repository.get(`${resource}`);
}

function getAllVideoInfosWithUserId(authorId) {
    return Repository.get(`${resource}/users/${authorId}`);
}

function getVideoById(videoId) {
    return Repository.get(`${resource}/${videoId}`);
}

function upload(payload) {
    return Repository.post(`${resource}/upload`, payload);
}

export default {
    get,
    getAllVideoInfosWithUserId,
    getVideoById,
    upload
}
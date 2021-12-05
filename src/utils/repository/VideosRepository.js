import Repository from "./Repository";

const resource = "/videos";

function get() {
    return Repository.get(`${resource}`);
}

function getVideoById(videoId) {
    return Repository.get(`${resource}/${videoId}`);
}

function upload(payload) {
    return Repository.post(`${resource}/upload`, payload);
}

export default {
    get,
    getVideoById,
    upload
}
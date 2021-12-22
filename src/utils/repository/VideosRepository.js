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

function uploadVideo (payload) {
    return Repository.post(`${resource}/upload`, payload);
}

function updateVideo (payload) {
    return Repository.put(`${resource}/update`, payload);
}

function deleteVideo (videoId) {
    return Repository.delete(`${resource}/delete/${videoId}`);
}

export default {
    get,
    getAllVideoInfosWithUserId,
    getVideoById,
    uploadVideo,
    updateVideo,
    deleteVideo
}
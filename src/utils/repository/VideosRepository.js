import Repository from "./Repository";

const resource = "/videos";

function get() {
    return Repository.get(`${resource}`);
}

function getAllPublicVideoInfos() {
    return Repository.get(`${resource}/public`);
}

function getAllVideoInfosWithUserId(author_id) {
    return Repository.get(`${resource}/users/${author_id}`);
}

function getAllPublicVideoInfosWithUserId(author_id) {
    return Repository.get(`${resource}/users/${author_id}/public`);
}

function getVideoById(video_id) {
    return Repository.get(`${resource}/${video_id}`);
}

function uploadVideo (payload) {
    return Repository.post(`${resource}/upload`, payload);
}

function updateVideo (payload) {
    return Repository.put(`${resource}/update`, payload);
}

function deleteVideo (payload) {
    return Repository.post(`${resource}/delete/`, payload);
}

export default {
    get,
    getAllPublicVideoInfos,
    getAllVideoInfosWithUserId,
    getAllPublicVideoInfosWithUserId,
    getVideoById,
    uploadVideo,
    updateVideo,
    deleteVideo
}
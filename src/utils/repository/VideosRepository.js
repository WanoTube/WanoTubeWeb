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

function uploadVideo(payload) {
	return Repository.post(`${resource}/upload`, payload);
}

function updateVideo(payload) {
	return Repository.patch(`${resource}/update`, payload);
}

function increaseView({ videoId, viewerId }) {
	return Repository.patch(`${resource}/update/${videoId}`, { viewerId });
}

function deleteVideo(payload) {
	return Repository.post(`${resource}/delete/`, payload);
}

function getVideoLikes(videoId) {
	return Repository.get(`${resource}/${videoId}/likes/`);
}

function getVideoTotalLikes(videoId) {
	return Repository.get(`${resource}/${videoId}/total-likes/`);
}

function likeVideo(payload) {
	return Repository.post(`${resource}/like/`, payload);
}

function getVideoComments(videoId) {
	return Repository.get(`${resource}/${videoId}/comments/`);
}

function getVideoTotalComments(videoId) {
	return Repository.get(`${resource}/${videoId}/total-comments/`);
}

function commentVideo(payload) {
	return Repository.post(`${resource}/comment/`, payload);
}

function deleteComment(payload) {
	return Repository.post(`${resource}/comment/delete`, payload);
}

function getVideoTotalViews(videoId) {
	return Repository.get(`${resource}/${videoId}/total-views`);
}

export default {
	get,
	getAllPublicVideoInfos,
	getAllVideoInfosWithUserId,
	getAllPublicVideoInfosWithUserId,
	getVideoById,
	uploadVideo,
	updateVideo,
	deleteVideo,
	getVideoLikes,
	getVideoTotalLikes,
	likeVideo,
	getVideoComments,
	getVideoTotalComments,
	commentVideo,
	deleteComment,
	increaseView,
	getVideoTotalViews
}
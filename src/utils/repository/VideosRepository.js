import Repository from "./Repository";

const resource = "/videos";

const header = JSON.parse(localStorage.getItem('token'));
const config = {
	headers: {
		"authorization": `Bear ${header}`
	}
}

function get() {
	return Repository.get(`${resource}`);
}

function getAllPublicVideoInfos() {
	return Repository.get(`${resource}/public`);
}

function getVideoById(video_id) {
	return Repository.get(`${resource}/${video_id}`);
}

function uploadVideo(payload) {
	return Repository.post(`${resource}/upload`, payload, config);
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
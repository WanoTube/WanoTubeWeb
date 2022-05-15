import Repository from "./Repository";

const resource = "/videos";

function get() {
	return Repository.get(`${resource}`);
}

function getAllPublicVideoInfos() {
	return Repository.get(`${resource}/public`);
}

function getVideoById(video_id) {
	const header = JSON.parse(localStorage.getItem('token'));
	const config = {
		headers: {
			"authorization": `Bear ${header ? header : ""}`
		}
	}
	return Repository.get(`${resource}/${video_id}`, config);
}

function uploadVideo(payload) {
	const header = JSON.parse(localStorage.getItem('token'));
	const config = {
		headers: {
			"authorization": `Bear ${header ? header : ""}`
		}
	}
	return Repository.post(`${resource}/upload`, payload, config);
}

function updateVideo(payload) {
	const header = JSON.parse(localStorage.getItem('token'));
	const config = {
		headers: {
			"authorization": `Bear ${header ? header : ""}`
		}
	}
	return Repository.patch(`${resource}/update`, payload, config);
}

function deleteVideo(payload) {
	const header = JSON.parse(localStorage.getItem('token'));
	const config = {
		headers: {
			"authorization": `Bear ${header ? header : ""}`
		}
	}
	return Repository.post(`${resource}/delete/`, payload, config);
}

function increaseView({ videoId, viewerId }) {
	return Repository.patch(`${resource}/update/${videoId}`, { viewerId });
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
	const header = JSON.parse(localStorage.getItem('token'));
	const config = {
		headers: {
			"authorization": `Bear ${header ? header : ""}`
		}
	}
	return Repository.post(`${resource}/comment/`, payload, config);
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
import httpRequest from './httpRequest';

export const getAllChannelVideosRequest = () => {
  console.log("Get All Channel's Videos");
  return httpRequest({ endpoint: `/channels/videos`, requireToken: true });
}

export const getAllChannelPublicVideosRequest = (channelId) => {
  console.log("Get All Channel's Public Videos");
  return httpRequest({ endpoint: `/channels/${channelId}/videos` });
}

export const getChannelPublicInformationRequest = (channelId) => {
  console.log("Get Channel Public Information");
  return httpRequest({ endpoint: `/channels/${channelId}/info` });
}

export const getWatchHistoryRequest = () => {
  console.log("Get History");
  return httpRequest({ endpoint: `/videos/history`, requireToken: true });
}

export const increaseViewRequest = ({ viewerId, videoId }) => {
  console.log("Increase View");
  return httpRequest({ endpoint: `/videos/${videoId}/view`, method: 'patch', bodyParameters: { viewerId }, requireToken: true });
}

export const watchLaterRequest = (videoId) => {
  console.log("Watch Later ")
  return httpRequest({ endpoint: `/videos/watch-later/${videoId}`, method: 'patch', requireToken: true });
}

export const removeWatchLaterVideoRequest = (videoId) => {
  console.log("Remove Watch Later Video")
  return httpRequest({ endpoint: `/videos/watch-later/${videoId}/remove`, method: 'patch', requireToken: true });
}

export const getWatchLaterVideosRequest = (videoId) => {
  console.log("Get Watch Later Videos")
  return httpRequest({ endpoint: `/videos/watch-later`, requireToken: true });
}

export const getVideoTagsRequest = () => {
  console.log("Get Video Tags");
  return httpRequest({ endpoint: `/videos/tags` });
}

export const getFeedRequest = () => {
  console.log("Get Feed");
  return httpRequest({ endpoint: `/videos/feed`, requireToken: true });
}

export const getVideoSuggestionRequest = (videoId) => {
  console.log("Get Video Suggestion");
  return httpRequest({ endpoint: `/videos/${videoId}/suggestion` });

}

export const getSearchSuggestionRequest = (keyword) => {
  console.log("Get Search Suggestion");
  return httpRequest({ endpoint: `/videos/search-suggestions?keyword=${keyword}` });
}

export const getSearchResultRequest = (keyword) => {
  console.log("Get Search Result");
  return httpRequest({ endpoint: `/videos/search-results?keyword=${keyword}` });
}

export const getChannelOverview = () => {
  console.log("Get channel overview");
  return httpRequest({ endpoint: '/channels/overview', requireToken: true });
}
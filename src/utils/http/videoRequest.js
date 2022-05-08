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
import httpRequest from './httpRequest';

export const getWatchHistory = () => {
  console.log("Get History")
  return httpRequest({ endpoint: `/videos/history`, requireToken: true })
}

export const increaseViewRequest = ({ viewerId, videoId }) => {
  console.log("Increase View")
  return httpRequest({ endpoint: `/videos/${videoId}/view`, method: 'patch', bodyParameters: { viewerId }, requireToken: true })
}
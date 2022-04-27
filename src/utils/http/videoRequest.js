import httpRequest from './httpRequest';

export const increaseViewRequest = ({ viewerId, videoId }) => {
  console.log("increase View")
  return httpRequest({ endpoint: `/videos/${videoId}/view`, method: 'patch', bodyParameters: { viewerId }, requireToken: true })
}
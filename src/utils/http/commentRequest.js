import httpRequest from './httpRequest';

export const getCommentRepliesRequest = (commentId) => {
  console.log("Get Comment Replies Request")
  return httpRequest({ endpoint: `/comments/${commentId}/replies` });
}

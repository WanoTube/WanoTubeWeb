import httpRequest from './httpRequest';

export const getCommentRepliesRequest = (commentId) => {
  console.log("Get Comment Replies Request")
  return httpRequest({ endpoint: `/comments/${commentId}/replies` });
}

export const removeCommentRequest = (commentId) => {
  console.log("Remove Comment Request")
  return httpRequest({ endpoint: `/comments/${commentId}/remove`, method: 'patch', requireToken: true });
}

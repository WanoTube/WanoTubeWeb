import httpRequest from './httpRequest';

export const getChannelInfoByAccountIdRequest = (accountId) => {
  console.log("Get My User Info")
  return httpRequest({ endpoint: `/users/${accountId}`, requireToken: true });
}

export const updateMyChannelInfoRequest = (payload) => {
  console.log("Update My User Info")
  return httpRequest({ endpoint: `/users`, method: 'patch', bodyParameters: payload, requireToken: true });
}

export const getCopyrightStatusRequest = () => {
  console.log("Get Copyright Status")
  return httpRequest({ endpoint: `/users/copyright-status`, requireToken: true });
}

export const followChannelRequest = (videoId) => {
  console.log("Follow Channel")
  return httpRequest({ endpoint: `/channels/${videoId}/follow`, method: 'patch', requireToken: true });
}

export const unfollowChannelRequest = (videoId) => {
  console.log("Unfollow Channel")
  return httpRequest({ endpoint: `/channels/${videoId}/unfollow`, method: 'patch', requireToken: true });
}

export const getFollowInfoRequest = () => {
  console.log("Get Follow Info")
  return httpRequest({ endpoint: `/users/follow-info`, requireToken: true });
}

export const getFollowingChannelsRequest = () => {
  console.log("Get Following Channels")
  return httpRequest({ endpoint: `/users/followings`, requireToken: true });
}

export const hideCommentFromChannelRequest = (userId) => {
  console.log("Hide Comment From Channel Request")
  return httpRequest({ endpoint: `/channels//users/${userId}/hide`, method: 'patch', requireToken: true });
}



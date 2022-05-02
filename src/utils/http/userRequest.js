import httpRequest from './httpRequest';

export const getChannelInfoByAccountIdRequest = (accountId) => {
  console.log("Get My User Info")
  return httpRequest({ endpoint: `/users/${accountId}`, requireToken: true })
}

export const updateMyChannelInfo = (payload) => {
  console.log("Update My User Info")
  return httpRequest({ endpoint: `/users`, method: 'patch', bodyParameters: payload, requireToken: true })
}
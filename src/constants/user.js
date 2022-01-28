const { VUE_APP_SERVER_URL, VUE_APP_VERSION_1 } = process.env;

export const userApi = `${VUE_APP_SERVER_URL}/${VUE_APP_VERSION_1}/users`
export const avatarUrlPrefix = `${userApi}/avatar`
export const defaultAvatarUrl = `${avatarUrlPrefix}/default_avatar.png`
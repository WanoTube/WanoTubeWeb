const { VUE_APP_SERVER_URL, VUE_APP_VERSION_1, VUE_APP_URL } = process.env;

export const appUrl = VUE_APP_URL;

export const serverUrl = VUE_APP_SERVER_URL;
export const apiUrl = `${VUE_APP_SERVER_URL}/${VUE_APP_VERSION_1}`
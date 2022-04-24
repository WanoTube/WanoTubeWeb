const { VUE_APP_SERVER_URL, VUE_APP_VERSION_1 } = process.env;

export const serverUrl = VUE_APP_SERVER_URL;
export const apiUrl = `${VUE_APP_SERVER_URL}/${VUE_APP_VERSION_1}`
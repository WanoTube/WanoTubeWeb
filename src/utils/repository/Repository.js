import axios from 'axios';
const { VUE_APP_SERVER_URL, VUE_APP_VERSION_1 } = process.env;
const baseUrl = `${VUE_APP_SERVER_URL}/${VUE_APP_VERSION_1}/`

axios.defaults.baseURL = baseUrl

export default axios.create({
	baseUrl
})


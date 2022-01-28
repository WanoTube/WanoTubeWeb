import axios from 'axios';
const version = "v1/"
const baseDomain = "http://localhost:8000/"
const baseUrl = baseDomain + version

axios.defaults.baseURL = baseUrl

export default axios.create({
	baseUrl
})


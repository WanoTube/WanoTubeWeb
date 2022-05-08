import axios from 'axios'

const { VUE_APP_SERVER_URL, VUE_APP_VERSION_1 } = process.env;
const baseURL = `${VUE_APP_SERVER_URL}/${VUE_APP_VERSION_1}/`

const axiosClient = axios.create({
  baseURL
})

const httpRequest = async ({
  endpoint,
  method = 'get',
  bodyParameters,
  query,
  requireToken = false,
  isFormData = false
}) => {
  let config;
  if (requireToken) {
    const accessTokenJSON = localStorage.getItem('token');
    if (accessTokenJSON) {
      const accessToken = JSON.parse(accessTokenJSON);

      if (accessToken) {
        config = {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
          },
          params: query,
        };
      }
    }
  }

  if (method === 'get' || method === 'GET') {
    const response = await axiosClient[method](endpoint, config);
    return response.data;
  }

  const response = await axiosClient[method](endpoint, bodyParameters, config);
  return response.data;
}

export default httpRequest;
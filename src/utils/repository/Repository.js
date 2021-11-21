import axios from 'axios';
const version = "v1/"
const baseDomain = "http://localhost:8000/"
const baseUrl = baseDomain + version

axios.defaults.baseURL = baseUrl
axios.defaults.headers = {
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTlhODc0Njc4MzlhMTkzNzg3YTI5ZTUiLCJpYXQiOjE2Mzc1MTc3MDIsImV4cCI6MTYzNzYwNDEwMn0.vclzPxnI5xFOX2_TbHX6L2qOOsegcQHmcJl7ypGT_l0"
}

export default axios.create({
    baseUrl, 
    header: { "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTlhODc0Njc4MzlhMTkzNzg3YTI5ZTUiLCJpYXQiOjE2Mzc1MTc3MDIsImV4cCI6MTYzNzYwNDEwMn0.vclzPxnI5xFOX2_TbHX6L2qOOsegcQHmcJl7ypGT_l0" }
})


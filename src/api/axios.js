import axios from "axios";

const BASE_URL = 'http://localhost:3001'

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {'content-type': 'application/json',
                "Access-Control-Allow-Origin": "true"}
});

export const axiosSecure = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {'content-type': 'application/json'}
});
import axios from "axios";

const $core = axios.create({
    baseURL: process.env.SERVICE_CORE_URL,
    withCredentials: true
})

export { $core };

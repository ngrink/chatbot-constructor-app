import axios from "axios";

const $axios = axios.create({
    baseURL: process.env.CORE_API_URL,
    withCredentials: true,
    headers: {
        'X-CORE-KEY': process.env.CORE_API_ACCESS_KEY
    }
})

export { $axios };

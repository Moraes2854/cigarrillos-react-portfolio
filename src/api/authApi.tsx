import axios from 'axios';

const baseURL = `${window.location.origin}/api/auth`;



const authApi = axios.create({
    baseURL,
});

authApi.interceptors.request.use( (config) => {
    config.headers = {
        ...config.headers,
    }

    return config;
});

export default authApi;

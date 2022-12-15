import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';


const baseURL = `${getEnvVariables().VITE_APP_API_URL}/auth`;

const authApi = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')!}` }
});

authApi.interceptors.request.use( (config) => {
    config.headers = {
        ...config.headers,
    }
    return config;
});

export default authApi;

import axios from 'axios';
import { getToken, getUserData, logout } from './authentication';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(async (config) => {
    const token = getToken();
    const modifiedConfig = config;

    if (token) {
        const userData = getUserData();
        const todayPlusLifetime = new Date(new Date().getTime() + 3 * 24 * 60 * 60);
        const expireDate = new Date(userData.exp * 1000);

        // Expired token
        if (todayPlusLifetime > expireDate) {
            logout();
            return modifiedConfig;
        }

        modifiedConfig.headers.Authorization = `Bearer ${token}`;
    }

    return modifiedConfig;
});

export default api;

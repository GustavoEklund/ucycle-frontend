import JwtDecode from 'jwt-decode';

export const TOKEN_KEY = '@ucycle-Token';
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);
export const isAuthenticated = () => getToken() !== null;

export const login = (token, url = '/') => {
    setToken(token);
    window.location.href = url;
};

export const logout = () => {
    removeToken();
    window.location.href = '/login';
};

export const getUserData = () => {
    const token = getToken();

    if (
        token
        && (typeof token === 'string')
        && token !== 'undefined'
    ) {
        return JwtDecode(token);
    }

    return { options: {} };
};

export const accessPermission = (permission) => {
    const userData = getUserData();

    if (userData.options.length < 1) {
        return false;
    }

    return (
        userData.options[permission]
        && userData.options[permission][0] === 'd'
    );
};

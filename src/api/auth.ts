import api from './axios';

export const getMe = () => api.get('/auth/me').then(r => r.data);
export const logout = () => api.get('/auth/logout');
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://oidivi-api.test/api/v1/client',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

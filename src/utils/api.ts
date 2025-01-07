import axios from 'axios';

const api = axios.create({
  baseURL: 'http://oidivi-api.test/api/v1/client', // Ajusta tu baseURL según tu backend
});

// Interceptor para añadir el token en las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

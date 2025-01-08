import axios from 'axios';

const api = axios.create({
  baseURL: 'http://oidivi-api.test/api/v1/client', // Ajusta la baseURL según tu backend
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

/**
 * Actualizar el perfil del usuario
 * @param data Los datos del perfil a actualizar
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProfile = (data: Record<string, any>) => {
  return api.post('/profile', data); // Usamos el endpoint genérico para actualizar el perfil
};

export default api;

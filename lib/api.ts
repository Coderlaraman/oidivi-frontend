import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Interceptor para incluir el token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Actualiza los datos básicos del perfil del usuario.
 *
 * @param data Objeto con los datos básicos del perfil.
 * @returns Promesa con la respuesta de la API.
 */

export const updateProfileData = (data: Record<string, any>) => {
  return api.post("/v1/client/update-profile", data, {
    headers: { "Content-Type": "application/json" },
  });
};

/**
 * Sube la imagen de perfil del usuario.
 *
 * @param profilePhoto Archivo de imagen.
 * @returns Promesa con la respuesta de la API.
 */
export const uploadProfilePhoto = (profilePhoto: File) => {
  const formData = new FormData();
  formData.append("profile_photo_url", profilePhoto);

  return api.post("/v1/client/profile/photo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/**
 * Elimina la foto de perfil del usuario.
 *
 * @returns Promesa con la respuesta de la API.
 */
export const deleteProfilePhoto = () => {
  return api.delete("/v1/client/profile/photo");
};

/**
 * Sube el video de perfil del usuario.
 *
 * @param profileVideo Archivo de video.
 * @returns Promesa con la respuesta de la API.
 */
export const uploadProfileVideo = (profileVideo: File) => {
  const formData = new FormData();
  formData.append("profile_video_url", profileVideo);

  return api.post("/v1/client/profile/video", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/**
 * Obtiene los datos del dashboard del usuario.
 *
 * @returns Promesa con la respuesta de la API que incluye datos del usuario y estadísticas.
 */
export const getDashboardData = () => {
  return api.get("/dashboard");
};

export default api;

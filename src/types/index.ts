export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  roles: string[];
  profile_photo_url?: string; // Agregado opcional para url de imagen
  profile_video_url?: string; // Agregado opcional para url de video
}

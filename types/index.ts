export interface AddressLocation {
  address: string;
  zip_code: string;
  latitude: number;
  longitude: number;
}

export interface UserStats {
  completed_tasks: number;
  active_services: number;
  total_earnings: number;
  rating: number;
}

export interface User extends AddressLocation {
  id: number;
  name: string;
  email: string;
  phone: string;
  roles: string[];
  profile_photo_url: string | null;
  profile_video_url: string | null;
  // Campos opcionales para verificación
  email_verified_at?: string | null;
  phone_verified_at?: string | null;
  stats?: UserStats;
}

export interface LocationSuggestion {
  place_id: string;
  lat: string;
  lon: string;
  display_name: string;
  // Otros campos que consideres necesarios
}
